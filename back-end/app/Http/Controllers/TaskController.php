<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch tasks using Eloquent
        $tasks = Task::where('userId', Auth::id())->get();
        return response()->json($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'task' => 'required|string|max:255',
            'statusId' => 'required|exists:statuses,id',
            'dueDate' => 'required|date',
        ]);

        // Create a new task using Eloquent
        $task = Task::create([
            'userId' => Auth::id(),
            'task' => $validated['task'],
            'statusId' => $validated['statusId'],
            'dueDate' => $validated['dueDate'],
        ]);

        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Fetch a specific task using Eloquent
        $task = Task::where('id', $id)
            ->where('userId', Auth::id())
            ->firstOrFail();
        return response()->json($task);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, string $id)
{
    $response = [];

    try {
        $validated = $request->validate([
            'task' => 'required|string|max:255',
            'statusId' => 'required|exists:statuses,id',
            'dueDate' => 'required|date_format:Y-m-d H:i:s',
        ]);

        $task = Task::where('id', $id)
            ->where('userId', Auth::id())
            ->firstOrFail();

        $task->update($validated);

        // Prepare the successful response
        $response = response()->json($task);
    } catch (ValidationException $e) {
        // Prepare the validation error response
        $response = response()->json(['errors' => $e->errors()], 422);
    } catch (ModelNotFoundException $e) {
        // Prepare the not found error response
        $response = response()->json(['error' => 'Task not found'], 404);
    } catch (\Exception $e) {
        // Prepare the general error response
        $response = response()->json(['error' => $e->getMessage()], 500);
    }

    // Return the prepared response at the end
    return $response;
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find and delete the task using Eloquent
        $task = Task::where('id', $id)
            ->where('userId', Auth::id())
            ->firstOrFail();
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }

/**
 * Search tasks by task name or due date.
 *
 * @param \Illuminate\Http\Request $request
 * @return \Illuminate\Http\JsonResponse
 */
    public function search(Request $request)
    {
        // Get the search term from the JSON body
        $searchTerm = $request->input('search');

        // Initialize the query builder for Task model
        $query = Task::query();

        // Search by task name only
        $query->where('task', 'like', '%' . $searchTerm . '%');

        // Execute the query and get the results
        $tasks = $query->get();

        // Return the results as a JSON response
        return response()->json([
            'status' => 'success',
            'data' => $tasks,
        ]);
    }

    /**
     * Filter tasks with optional sorting by due date (ascending or descending).
     */
    public function filter(Request $request)
    {
        // Fetch tasks for the authenticated user
        $query = Task::where('userId', Auth::id());

        // Apply search filters if they exist in the request
        if ($request->has('task')) {
            $query->where('task', 'like', '%' . $request->input('task') . '%');
        }

        if ($request->has('statusId')) {
            $query->where('statusId', $request->input('statusId'));
        }

        if ($request->has('dueDate')) {
            $query->whereDate('dueDate', $request->input('dueDate'));
        }

        // Sort by dueDate if 'order' parameter is provided
        if ($request->has('order')) {
            $order = strtolower($request->input('order'));

            // Validate the order parameter and apply sorting
            if ($order === 'asc') {
                $query->orderBy('dueDate', 'asc'); // Ascending (smaller to bigger)
            } elseif ($order === 'desc') {
                $query->orderBy('dueDate', 'desc'); // Descending (bigger to smaller)
            }
        }

        // Get the filtered and sorted tasks
        $tasks = $query->get();

        return response()->json($tasks);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get a user ID (assuming there is at least one user)
        $userId = User::first()->id;

        // Define tasks with corresponding status IDs
        $items = [
            ['task' => 'Home Work', 'dueDate' => '05/06/2024, 01:00', 'status' => 1], // Open
            ['task' => 'Grocery Shopping', 'dueDate' => '05/07/2024, 10:00', 'status' => 3], // Done
            ['task' => 'Call Mom', 'dueDate' => '05/08/2024, 16:00', 'status' => 2], // In Progress
            ['task' => 'Finish Project', 'dueDate' => '05/09/2024, 12:00', 'status' => 2], // In Progress
            ['task' => 'Gym Workout', 'dueDate' => '05/10/2024, 07:00', 'status' => 1], // Open
            ['task' => 'Dentist Appointment', 'dueDate' => '05/11/2024, 09:30', 'status' => 1], // Open
            ['task' => 'Team Meeting', 'dueDate' => '05/12/2024, 14:00', 'status' => 2], // In Progress
            ['task' => 'Book Reading', 'dueDate' => '05/13/2024, 20:00', 'status' => 4], // Closed
            ['task' => 'Code Review', 'dueDate' => '05/14/2024, 11:00', 'status' => 3], // Done
            ['task' => 'Grocery Shopping', 'dueDate' => '05/15/2024, 17:30', 'status' => 1], // Open
        ];

        // Loop through each task and create it
        foreach ($items as $item) {
            Task::create([
                'userId' => $userId,
                'task' => $item['task'],
                'statusId' => $item['status'], // Directly assign the status ID
                'dueDate' => Carbon::createFromFormat('m/d/Y, H:i', $item['dueDate']),
            ]);
        }
    }
}

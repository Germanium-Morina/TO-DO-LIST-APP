import { useState, useRef } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import Search from "./Search";
import TableItems from "./TableItems";
import useVerticalScrollbar from "../Scrollbars/useVerticalScrollbar";
import useHorizontalScrollbar from "../Scrollbars/useHorizontalScrollbar";
import AddModal from "../Modals/AddModal";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";
import "./style.css";

function TaskTable() {
  const [items, setItems] = useState([
    { task: "Home Work", status: 2, dueDate: "05/06/2024, 01:00" },
    { task: "Grocery Shopping", status: 1, dueDate: "05/07/2024, 10:00" },
    { task: "Call Mom", status: 2, dueDate: "05/08/2024, 16:00" },
    { task: "Finish Project", status: 3, dueDate: "05/09/2024, 12:00" },
    { task: "Gym Workout", status: 1, dueDate: "05/10/2024, 07:00" },
    { task: "Dentist Appointment", status: 3, dueDate: "05/11/2024, 09:30" },
    { task: "Team Meeting", status: 2, dueDate: "05/12/2024, 14:00" },
    { task: "Book Reading", status: 1, dueDate: "05/13/2024, 20:00" },
    { task: "Code Review", status: 2, dueDate: "05/14/2024, 11:00" },
    { task: "Grocery Shopping", status: 1, dueDate: "05/15/2024, 17:30" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeStatus, setActiveStatus] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const scrollRef = useRef(null);

  useVerticalScrollbar(scrollRef);
  useHorizontalScrollbar(scrollRef);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsTyping(false);
  };

  const filteredItems = items.filter((item) => item.status === activeStatus);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const openEditModal = (task) => {
    setCurrentTask(task);
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);

  const addTask = (newTask) => {
    setItems([...items, newTask]);
  };

  const updateTask = (updatedTask) => {
    setItems(items.map((item) => (item === currentTask ? updatedTask : item)));
    closeEditModal();
  };

  const openDeleteModal = (task) => {
    setCurrentTask(task);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => setShowDeleteModal(false);

  const deleteTask = () => {
    setItems(items.filter((item) => item !== currentTask));
    closeDeleteModal();
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, status: parseInt(newStatus, 10) } : item
    );
    setItems(updatedItems);

    if (parseInt(newStatus, 10) !== activeStatus) {
      setActiveStatus(parseInt(newStatus, 10));
    }
  };

  const statusTabs = [
    { label: "Open", status: 1 },
    { label: "In Progress", status: 2 },
    { label: "Done", status: 3 },
    { label: "Closed", status: 4 },
  ];
  useVerticalScrollbar(scrollRef);
  useHorizontalScrollbar(scrollRef);

  return (
    <div className="w-full h-full flex justify-center items-center mobile:pr-7 mobile:pl-7 pr-3 pl-3">
      <div className="bg-white w-full rounded-lg shadow-gray-200 shadow-lg overflow-hidden">
        <div className="flex flex-row w-full justify-between border-b-4 pb-3 items-center pt-4 md:pr-4 md:pl-4 pr-3 pl-3">
          <div className="flex flex-row gap-2 items-baseline w-full">
            <MDBIcon fas icon="tasks" size="lg" />
            <h1 className="text-xl m-0 font-medium">Task List</h1>
          </div>
          <div className="flex w-full items-center justify-end">
            <Search
              searchQuery={searchQuery}
              handleInputChange={handleInputChange}
              clearSearch={clearSearch}
              isTyping={isTyping}
            />
          </div>
        </div>
        <div className="relative overflow-hidden custom-scrollbar flex flex-row">
          {/* Status Navbar */}
          <div className="w-[10%] border-r-2 flex-none flex flex-col px-2 justify-center items-center">
            {statusTabs.map((tab, index) => (
              <button
                key={tab.status}
                className={`text-center text-sm py-4 leading-6 tracking-wide transition duration-300 border-b-2 w-full ${
                  activeStatus === tab.status
                    ? "border-b-4 border-blue-700 font-bold"
                    : "hover:text-shadow"
                } ${index === statusTabs.length - 1 ? "last:border-b-0" : ""}`}
                onClick={() => setActiveStatus(tab.status)}>
                {tab.label}
              </button>
            ))}
          </div>

          <div
            ref={scrollRef}
            className="max-h-[calc(85vh-250px)] overflow-y-scroll overflow-x-scroll relative hide-scrollbar w-[90%] pl-4 pr-4">
            <div className="flex border-b-2 min-w-[1000px] py-3">
              <ul className="flex w-full text-lg m-0 p-0">
                <li className="flex-1 text-center">No.</li>
                <li className="flex-3 text-left">Task</li>
                <li className="flex-2 text-center">Status</li>
                <li className="flex-3 text-center">Due Date</li>
                <li className="flex-2 text-center">Action</li>
              </ul>
            </div>
            <TableItems
              items={filteredItems}
              searchQuery={searchQuery}
              setIsTyping={setIsTyping}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
              handleStatusChange={handleStatusChange}
            />
          </div>

          {/* Vertical scrollbar */}
          <div className="absolute right-0 top-0 h-full transition-all duration-200 ease-in-out z-10 scrollbar-container">
            <div className="scrollbar-thumb absolute right-0 h-full w-full transition-all duration-200 rounded-lg ease-in-out"></div>
          </div>

          {/* Horizontal scrollbar */}
          <div className="absolute bottom-2 left-0 w-full transition-all duration-200 ease-in-out z-10 horizontal-scrollbar-container">
            <div className="horizontal-scrollbar-thumb absolute w-full h-full transition-all duration-200 rounded-lg ease-in-out"></div>
          </div>
        </div>
        <div className="flex flex-row justify-end pt-4 pb-4 pr-5 pl-5 border-t-4">
          <button
            type="button"
            onClick={openAddModal}
            className="text-base bg-blue-700 text-white pl-3 pr-3 pt-2 pb-2 rounded-lg whitespace-nowrap shadow-blue-200 shadow-md hover:shadow-blue-300 hover:shadow-md hover:bg-blue-800">
            Add New Task
          </button>
        </div>
      </div>
      <AddModal
        show={showAddModal}
        handleClose={closeAddModal}
        handleSubmit={addTask}
      />
      <EditModal
        show={showEditModal}
        handleClose={closeEditModal}
        handleSubmit={updateTask}
        task={currentTask}
      />
      <DeleteModal
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        handleDelete={deleteTask}
        task={currentTask}
      />
    </div>
  );
}

export default TaskTable;
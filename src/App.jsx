import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { DndContext } from "@dnd-kit/core";
import Column from "./components/Column";
import { MdMenu, MdClose } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, updateTaskStatus } from "./redux/taskSlice";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
  { id: "DELETE", title: "Delete" },
];

const App = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [isNavbarOpen, setIsNavbarOpen] = useState(true); 
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    dispatch(updateTaskStatus({ taskId, status: newStatus }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleAddTaskClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTaskData = {
      id: (tasks.length + 1).toString(),
      title: newTask.title,
      description: newTask.description,
      status: "TODO",
    };
    dispatch(addTask(newTaskData));
    setNewTask({ title: "", description: "" });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setNewTask({ title: "", description: "" });
    setShowForm(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredColumns =
    selectedFilter === "ALL"
      ? COLUMNS
      : COLUMNS.filter((column) => column.id === selectedFilter);

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Toggleable Vertical Navbar */}
      <div
        className={`transition-all duration-300 ${
          isNavbarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white flex flex-col`}
      >
        {/* Navbar Header with Toggle Button */}
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          {/* Navbar Title */}
          {isNavbarOpen && (
            <h2
              className={`text-xl font-semibold transition-opacity duration-300`}
            >
              Task Filters
            </h2>
          )}

          {/* Navbar Toggle Button */}
          <button
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            className="text-white focus:outline-none"
          >
            {isNavbarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>

        {/* Navbar Filters */}
        {isNavbarOpen && (
          <nav className="flex flex-col gap-2 px-4 mt-4">
            <button
              className={`text-left px-4 py-2 rounded-lg ${
                selectedFilter === "ALL" ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedFilter("ALL")}
            >
              {isNavbarOpen && "All Tasks"}
            </button>
            {COLUMNS.map((column) => {
              if (column.title !== "Delete") {
                return (
                  <button
                    key={column.id}
                    className={`text-left px-4 py-2 rounded-lg ${
                      selectedFilter === column.id
                        ? "bg-blue-500"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedFilter(column.id)}
                  >
                    {isNavbarOpen && column.title}
                  </button>
                );
              }
              return null; // Ensure a value is returned for every iteration
            })}
          </nav>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="h-16 bg-white shadow-md">
          <Navbar />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-500 rounded-md"
            />
          </div>

          <button
            className="border-[#5de7fa] border-2 hover:bg-[#5de7fa] hover:border-[#348d99] px-4 flex justify-center items-center gap-1 py-2 mb-4 rounded-full"
            onClick={handleAddTaskClick}
          >
            <p>Add Task</p> <MdFormatListBulletedAdd className="text-lg" />
          </button>

          {/* Pop-up Form */}
          {showForm && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg w-80">
                <h2 className="text-xl mb-4">Add a New Task</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2">Task Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newTask.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Task Description</label>
                    <textarea
                      name="description"
                      value={newTask.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-between">
                    {/* Add Task Button */}
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Add Task
                    </button>
                    {/* Cancel Button */}
                    <button
                      type="button"
                      onClick={handleCancel} // Close the modal when clicked
                      className="bg-gray-400 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Task Columns */}
          <DndContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4">
              {filteredColumns.map((column) => {
                const tasksInColumn = filteredTasks.filter(
                  (task) => task.status === column.id
                );
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasksInColumn}
                    onDeleteTask={handleDeleteTask}
                  />
                );
              })}
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default App;

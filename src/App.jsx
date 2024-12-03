import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { DndContext } from "@dnd-kit/core";
import Column from "./components/Column";
import { MdFormatListBulletedAdd } from "react-icons/md";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
  { id: "DELETE", title: "Delete" },
];

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];

const App = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [showForm, setShowForm] = useState(false); // For controlling the popup visibility
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
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
    setTasks((prevTasks) => [...prevTasks, newTaskData]);
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

  const filteredColumns =
    selectedFilter === "ALL"
      ? COLUMNS
      : COLUMNS.filter((column) => column.id === selectedFilter);

  return (
    <div className="flex h-screen">
      {/* Vertical Navbar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-semibold px-6 py-4">Task Filters</h2>
        <nav className="flex flex-col gap-2 px-4">
          <button
            className={`text-left px-4 py-2 rounded-lg ${
              selectedFilter === "ALL" ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedFilter("ALL")}
          >
            All Tasks
          </button>
          {COLUMNS.map((column) => (
            <button
              key={column.id}
              className={`text-left px-4 py-2 rounded-lg ${
                selectedFilter === column.id
                  ? "bg-blue-500"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedFilter(column.id)}
            >
              {column.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div>
        <Navbar />
        <div className="flex-1 p-4">
          <div>
            <button
              className="border-[#5de7fa] border-2 hover:bg-[#5de7fa] hover:border-[#348d99] px-4 flex justify-center items-center gap-1 py-2 rounded-full"
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
                      />
                    </div>
                    <div>
                      <h1 className="text-sm relative -top-2 text-gray-500">
                        This task will be added in To-Do tasks.
                      </h1>
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                      >
                        Add Task
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Task Columns */}
            <div className="flex mt-4 gap-8">
              <DndContext onDragEnd={handleDragEnd}>
                {filteredColumns.map((column) => (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks.filter((task) => task.status === column.id)}
                  />
                ))}
              </DndContext>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

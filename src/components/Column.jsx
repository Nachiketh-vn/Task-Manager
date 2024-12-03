import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { LuListTodo } from "react-icons/lu";
import { MdPendingActions } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

export default function Column({ column, tasks }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      className={`flex w-80 flex-col rounded-lg border-2 ${
        column.title === "Delete"
          ? "border-red-300 w-60  border-dotted bg-red-100"
          : "border-blue-300"
      } p-4`}
    >
      {/* <h2 className="mb-4 font-semibold text-black">{column.title}</h2> */}
      {column.title === "To Do" ? (
        <h2 className="mb-4 font-semibold flex gap-2 items-center text-black">
          <LuListTodo />
          <p>{column.title}</p>
        </h2>
      ) : column.title === "In Progress" ? (
        <h2 className="mb-4 font-semibold flex gap-2 items-center text-black">
          <MdPendingActions />
          <p>{column.title}</p>
        </h2>
      ) : column.title === "Delete" ? (
        <h2 className="mb-4 font-semibold flex gap-2 items-center text-red-600">
          <MdDeleteForever />
          <p>{column.title}</p>
        </h2>
      ) : (
        <h2 className="mb-4 font-semibold flex gap-2 items-center text-black">
          <MdDone />
          <p>{column.title}</p>
        </h2>
      )}

      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {column.title !== "Delete" &&
          tasks.map((task) => {
            return <TaskCard key={task.id} task={task} />;
          })}
      </div>
    </div>
  );
}

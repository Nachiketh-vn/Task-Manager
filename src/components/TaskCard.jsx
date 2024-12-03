 import { useDraggable } from "@dnd-kit/core";

 export function TaskCard({ task }) {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
     id: task.id,
   });

   const style = transform
     ? {
         transform: `translate(${transform.x}px, ${transform.y}px)`,
       }
     : undefined;

   return (
     <div
       ref={setNodeRef}
       {...listeners}
       {...attributes}
       className="cursor-grab rounded-lg bg-[#77e7f6] border-2 border-[#1c8c9a] p-4 shadow-sm hover:shadow-md"
       style={style}
     >
       <h3 className="font-medium text-neutral-800">{task.title}</h3>
       <p className="mt-2 text-sm text-neutral-700">{task.description}</p>
     </div>
   );
 }
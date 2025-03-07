import React from "react";
import { motion } from "framer-motion";
import { Task } from "../types/types";
import { cn } from "../utils/cn";
import { CheckCheck, Users } from "lucide-react";

interface CardProps {
  task: Task;
  setSelectedTask: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Card(props: CardProps) {
  const { task, setSelectedTask } = props;

  return (
    <motion.div
      // for appear, disappear and scale animations for each card
      layout
      layoutId={`note-${task.id}`}
      onClick={() => setSelectedTask(task.id)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full h-44 max-w-[250px] bg-white text-black p-4 rounded-lg cursor-pointer overflow-hidden flex flex-col",
        { "bg-white/50": task.done }
      )}
    >
      <h3 className="font-semibold w-full overflow-hidden text-ellipsis">
        {task.title}
      </h3>
      <hr className="text-black/50 mb-2" />

      <p className="flex-1 overflow-hidden text-ellipsis line-clamp-3">
        {task.content}
      </p>

      <div className="flex items-center justify-end gap-4 mt-3">
        {task.done ? <CheckCheck size={20} /> : null}

        <div className="flex items-center justify-center gap-1">
          <Users size={20} />
          <span>{task.participants.length}</span>
        </div>
      </div>
    </motion.div>
  );
}

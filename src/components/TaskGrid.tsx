import { useMemo, useState } from "react";
import Card from "./Card";
import useAppStore from "../store/store";
import Button from "./Button";
import { Plus } from "lucide-react";
import NewTask from "./NewTask";
import { CategoriesEnum } from "../types/types";
import { Constants } from "../constants/constants";
import TaskDetail from "./TaskDetail";
import { cn } from "../utils/cn";

export default function TaskGrid() {
  const [newTaskPopup, setNewTaskPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const tasks = useAppStore((store) => store.tasks);
  const category = useAppStore((store) => store.category);

  const filteredTasks = useMemo(() => {
    switch (category) {
      case CategoriesEnum.ALL:
        return tasks;

      case CategoriesEnum.DONE:
        return tasks.filter((t) => t.done);

      case CategoriesEnum.UNDONE:
        return tasks.filter((t) => !t.done);

      case CategoriesEnum.OWNER:
        return tasks.filter(
          (t) => t.owner === localStorage.getItem(Constants.USERID) || ""
        );

      default:
        return tasks;
    }
  }, [tasks, category]);

  return (
    <main
      className={cn(
        "relative flex-1 bg-white/10 col-span-5 row-span-6 col-start-1 row-start-2 md:col-span-4 md:row-span-9 md:row-start-2 p-5 rounded-md auto-rows-max",
        {
          "overflow-scroll grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2":
            filteredTasks.length > 0,
        }
      )}
    >
      {/* Tasks */}
      {filteredTasks.length === 0 ? (
        <p className="w-full text-center text-white/50 grid-cols-6 mt-10">
          Henüz burada hiç görev yok. <br /> Hemen bir tane oluştur.
        </p>
      ) : (
        filteredTasks.map((task) => (
          <Card key={task.id} task={task} setSelectedTask={setSelectedTask} />
        ))
      )}

      {/* Task Detail */}
      <TaskDetail
        selectedTaskId={selectedTask}
        setSelectedTaskId={setSelectedTask}
      />

      {/* New Task Button */}
      <Button
        onClick={() => setNewTaskPopup(true)}
        disabled={!!selectedTask}
        className="fixed bottom-10 right-10 shadow-2xl rounded-full aspect-square p-4 min-w-3 bg-blue-500 hover:bg-blue-400 text-white"
      >
        <Plus />
      </Button>

      {/* New Task Popup */}
      <NewTask newTaskPopup={newTaskPopup} setNewTaskPopup={setNewTaskPopup} />
    </main>
  );
}

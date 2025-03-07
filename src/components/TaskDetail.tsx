import { AnimatePresence, motion } from "framer-motion";
import useAppStore from "../store/store";
import { useEffect, useState } from "react";
import { Task } from "../types/types";
import Button from "./Button";
import Input from "./Input";
import Textarea from "./Textarea";
import { Constants } from "../constants/constants";
import {
  Edit,
  FileCheck2,
  FileX2,
  Plus,
  Save,
  Trash,
  Users,
  X,
} from "lucide-react";

interface TaskDetailProps {
  selectedTaskId: string | null;
  setSelectedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function TaskDetail(props: TaskDetailProps) {
  const { selectedTaskId, setSelectedTaskId } = props;

  const [edit, setEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [participantsModal, setParticipantsModal] = useState(false);

  const tasks = useAppStore((store) => store.tasks);
  const setTasks = useAppStore((store) => store.setTasks);

  useEffect(() => {
    // Close edit state on details close
    if (!selectedTaskId) {
      setParticipantsModal(false);
      setEdit(false);
      return;
    }

    setSelectedTask(tasks.find((t) => t.id === selectedTaskId));
  }, [edit, selectedTaskId, tasks]);

  // Delete a task
  const handleDeleteTask = () => {
    const allTasks: Task[] = JSON.parse(
      localStorage.getItem(Constants.TASKS) || "[]"
    );

    const newTasks = allTasks.filter((t) => t.id !== selectedTaskId);

    localStorage.setItem(Constants.TASKS, JSON.stringify(newTasks));
    setTasks(tasks.filter((t) => t.id !== selectedTaskId));

    setSelectedTaskId(null);
  };

  // Change tasks done situation
  const handleChangeDone = () => {
    const allTasks: Task[] = JSON.parse(
      localStorage.getItem(Constants.TASKS) || "[]"
    );

    localStorage.setItem(
      Constants.TASKS,
      JSON.stringify(
        allTasks.map((t) => {
          if (t.id !== selectedTaskId) return t;

          return { ...t, done: !t.done };
        })
      )
    );
    setTasks(
      tasks.map((t) => {
        if (t.id !== selectedTaskId) return t;

        return { ...t, done: !t.done };
      })
    );

    setSelectedTaskId(null);
  };

  // Edit task
  const handleEdit = () => {
    if (!edit) return setEdit(true);
    if (!selectedTask) return;

    const allTasks: Task[] = JSON.parse(
      localStorage.getItem(Constants.TASKS) || "[]"
    );

    const newTasks = allTasks.map((t) => {
      if (t.id !== selectedTaskId) return t;

      return selectedTask;
    });

    localStorage.setItem(Constants.TASKS, JSON.stringify(newTasks));
    setTasks(
      tasks.map((t) => {
        if (t.id !== selectedTaskId) return t;

        return selectedTask;
      })
    );

    setSelectedTaskId(null);
  };

  return (
    <AnimatePresence>
      {selectedTaskId !== null && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-40"
          onClick={() => setSelectedTaskId(null)}
        >
          <motion.div
            layoutId={`note-${selectedTaskId}`}
            className="w-[90%] md:w-[400px] h-[500px] bg-white rounded-lg shadow-lg flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title  */}
            <div className="px-6 pt-6">
              {!edit ? (
                <p className="text-2xl font-bold">{selectedTask?.title}</p>
              ) : (
                <Input
                  type="text"
                  value={selectedTask?.title}
                  placeholder="Başlık"
                  className="flex-1"
                  inputClassName="text-black border-black border-black/50 focus:border-black"
                  onChange={(e) => {
                    setSelectedTask((prev) => ({
                      id: prev?.id || "",
                      title: e,
                      content: prev?.content || "",
                      owner: prev?.owner || "",
                      done: prev?.done || false,
                      participants: prev?.participants || [],
                    }));
                  }}
                />
              )}
            </div>

            <hr className="text-black/50 my-4 px-6" />

            {/* Content */}
            <div className="flex-1 overflow-scroll px-6">
              {!edit ? (
                <p>{selectedTask?.content}</p>
              ) : (
                <Textarea
                  value={selectedTask?.content}
                  placeholder="İçerik"
                  textareaClassName="h-[300px]"
                  onChange={(e) => {
                    setSelectedTask((prev) => ({
                      id: prev?.id || "",
                      title: prev?.title || "",
                      content: e,
                      owner: prev?.owner || "",
                      done: prev?.done || false,
                      participants: prev?.participants || [],
                    }));
                  }}
                />
              )}
            </div>

            {/* Actions */}
            <div className="mt-2 flex justify-around rounded-b-md bg-gray-600 p-2">
              <Button
                className="min-w-0 bg-transparent text-white hover:bg-transparent hover:opacity-80"
                onClick={() => setSelectedTaskId(null)}
              >
                <X />
              </Button>

              <Button
                className="min-w-0 bg-transparent text-white hover:bg-transparent hover:opacity-80"
                onClick={handleDeleteTask}
              >
                <Trash />
              </Button>

              <div className="relative">
                <Button
                  className="relative min-w-0 bg-transparent text-white hover:bg-transparent hover:opacity-80"
                  onClick={() => setParticipantsModal((prev) => !prev)}
                >
                  <>
                    <Users />

                    <div className="w-5 h-5 rounded-full bg-white absolute bottom-1 right-1 flex items-center justify-center">
                      <span className="text-xs text-black">
                        {selectedTask?.participants.length}
                      </span>
                    </div>
                  </>
                </Button>
                {participantsModal ? (
                  <Participants
                    taskId={selectedTaskId}
                    participants={selectedTask?.participants || []}
                    setParticipantsModal={setParticipantsModal}
                  />
                ) : null}
              </div>

              <Button
                className="min-w-0 bg-transparent text-white hover:bg-transparent hover:opacity-80"
                onClick={handleChangeDone}
              >
                {selectedTask?.done ? <FileX2 /> : <FileCheck2 />}
              </Button>

              <Button
                className="min-w-0 bg-transparent text-white hover:bg-transparent hover:opacity-80"
                onClick={handleEdit}
              >
                {!edit ? <Edit /> : <Save />}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ParticipantsProps {
  taskId: string;
  participants: string[];
  setParticipantsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Participants(props: ParticipantsProps) {
  const { taskId, participants, setParticipantsModal } = props;

  const [value, setValue] = useState("");

  const tasks = useAppStore((store) => store.tasks);
  const setTasks = useAppStore((store) => store.setTasks);

  const addParticipant = () => {
    // If user already exist dont add
    if (participants.includes(value)) return;

    const allTasks: Task[] = JSON.parse(
      localStorage.getItem(Constants.TASKS) || "[]"
    );

    const newTasks = allTasks.map((t) => {
      if (t.id !== taskId) return;

      return { ...t, participants: [...participants, value] };
    });

    localStorage.setItem(Constants.TASKS, JSON.stringify(newTasks));

    setTasks(
      tasks.map((t) => {
        if (t.id !== taskId) return t;

        return { ...t, participants: [...participants, value] };
      })
    );
  };

  const deleteParticipant = (id: string) => {
    const allTasks: Task[] = JSON.parse(
      localStorage.getItem(Constants.TASKS) || "[]"
    );

    const newTasks = allTasks.map((t) => {
      if (t.id !== taskId) return t;

      return { ...t, participants: participants.filter((p) => p !== id) };
    });

    localStorage.setItem(Constants.TASKS, JSON.stringify(newTasks));

    setTasks(
      tasks.map((t) => {
        if (t.id !== taskId) return t;

        return { ...t, participants: participants.filter((p) => p !== id) };
      })
    );
  };

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-2xl border-[1px] border-black/20 opacity-100 rounded-md w-[250px] md:w-[360px] h-[300px] absolute bottom-14 left-1/2 -translate-x-1/2 origin-bottom p-2 flex flex-col"
    >
      {/* Title and close button */}
      <div className="flex items-center justify-between">
        <p className="text-center font-semibold">Katılımcılar</p>

        <Button
          className="min-w-0 bg-transparent text-black hover:bg-transparent hover:opacity-80 p-0"
          onClick={() => setParticipantsModal(false)}
        >
          <X size={16} />
        </Button>
      </div>

      <hr className="text-black/50 my-2" />

      <div className="flex-1 flex flex-col gap-2 overflow-scroll">
        {participants.map((p) => {
          return (
            <div
              key={p}
              className="w-full p-2 flex items-center justify-between hover:bg-black/20"
            >
              <span>{p}</span>

              <Button
                className="min-w-0 bg-transparent text-black hover:bg-transparent hover:opacity-80 p-0"
                onClick={() => deleteParticipant(p)}
              >
                <X />
              </Button>
            </div>
          );
        })}
      </div>

      {/* Add new participant area */}
      <div className="flex items-center gap-2 mt-2">
        <Input
          type="text"
          value={value}
          maxLength={11}
          placeholder="T.C. No giriniz"
          inputClassName="text-black border-black border-black/50 focus:border-black"
          onChange={(e) => setValue(e)}
        />

        <Button
          className="min-w-0 bg-transparent text-black hover:bg-transparent hover:opacity-80 p-0"
          disabled={value.length !== 11}
          onClick={addParticipant}
        >
          <Plus />
        </Button>
      </div>
    </motion.div>
  );
}

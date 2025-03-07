import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "./Input";
import Button from "./Button";
import { Constants } from "../constants/constants";
import Textarea from "./Textarea";
import { Task } from "../types/types";
import useAppStore from "../store/store";
import { Plus, Users, X } from "lucide-react";
import { cn } from "../utils/cn";

interface NewTaskProps {
  newTaskPopup: boolean;
  setNewTaskPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewTask(props: NewTaskProps) {
  const { newTaskPopup, setNewTaskPopup } = props;

  const setTasks = useAppStore((store) => store.setTasks);

  const [participantsModal, setParticipantsModal] = useState(false);
  const [info, setInfo] = useState({
    title: "",
    content: "",
    done: false,
  });

  const [participants, setParticipants] = useState<string[]>([]);

  // Reset info when popup closed
  useEffect(() => {
    if (newTaskPopup) return;

    setInfo({
      title: "",
      content: "",
      done: false,
    });
    setParticipants([]);
    setParticipantsModal(false);
  }, [newTaskPopup]);

  const handleCreateTask = () => {
    const date = new Date();
    const userId = localStorage.getItem(Constants.USERID);

    // Set owner and id of task
    const task: Task = {
      ...info,
      participants: participants,
      id: date.toISOString(),
      owner: userId || "",
    };

    // Save task to local storage
    const allTasks: Task[] = JSON.parse(
      localStorage.getItem(Constants.TASKS) || "[]"
    );

    allTasks.push(task);
    localStorage.setItem(Constants.TASKS, JSON.stringify(allTasks));

    // Save task to store
    setTasks(allTasks);

    setNewTaskPopup(false);
  };

  return (
    <AnimatePresence>
      {newTaskPopup ? (
        <motion.div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-40">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[90%] md:w-[400px] bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4"
          >
            <h2 className="text-lg font-semibold text-center mb-4">
              Yeni Not Ekle
            </h2>
            <Input
              type="text"
              autoFocus={true}
              value={info.title}
              placeholder="Başlık"
              inputClassName="text-black border-black border-black/50 focus:border-black"
              onChange={(e) => setInfo((prev) => ({ ...prev, title: e }))}
            />

            <hr className="text-black/50" />

            <Textarea
              value={info.content}
              placeholder="İçerik"
              onChange={(e) => setInfo((prev) => ({ ...prev, content: e }))}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label htmlFor="done" className="cursor-pointer">
                  Tamamlandı
                </label>
                <input
                  id="done"
                  type="checkbox"
                  defaultChecked={info.done}
                  className="cursor-pointer"
                  onClick={() =>
                    setInfo((prev) => ({ ...prev, done: !prev.done }))
                  }
                />
              </div>

              <div className="relative">
                <Button
                  className="relative min-w-0 bg-transparent hover:bg-transparent hover:opacity-80"
                  onClick={() => setParticipantsModal((prev) => !prev)}
                >
                  <>
                    <Users />

                    <div className="w-5 h-5 rounded-full bg-gray-500 absolute bottom-1 right-1 flex items-center justify-center">
                      <span className="text-xs text-white">
                        {participants.length}
                      </span>
                    </div>
                  </>
                </Button>
                {participantsModal ? (
                  <Participants
                    participants={participants}
                    setParticipants={setParticipants}
                    setParticipantsModal={setParticipantsModal}
                  />
                ) : null}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setNewTaskPopup(false)}
                className="bg-black/30 hover:bg-black/20"
              >
                İptal
              </Button>
              <Button
                onClick={handleCreateTask}
                disabled={!info.title || !info.content}
                className={cn("bg-green-500 text-white hover:bg-green-400", {
                  "opacity-80": !info.title || !info.content,
                })}
              >
                Ekle
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

interface ParticipantsProps {
  participants: string[];
  setParticipantsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
}

function Participants(props: ParticipantsProps) {
  const { participants, setParticipants, setParticipantsModal } = props;

  const [value, setValue] = useState("");

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
                onClick={() =>
                  setParticipants(participants.filter((pr) => pr !== p))
                }
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
          onClick={() => {
            // If user already exist dont add
            if (participants.includes(value)) return;

            setParticipants([...participants, value]);
            setValue("");
          }}
        >
          <Plus />
        </Button>
      </div>
    </motion.div>
  );
}

import { useEffect } from "react";
import BG from "../assets/login-background.jpg";
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import useAppStore from "../store/store";
import { Constants } from "../constants/constants";
import { Task } from "../types/types";
import TaskGrid from "../components/TaskGrid";

export default function Homepage() {
  const setTasks = useAppStore((store) => store.setTasks);

  // Get all tasks from local storage on init
  useEffect(() => {
    const getTasks = () => {
      const userId = localStorage.getItem(Constants.USERID) || "";
      const allTastks: Task[] = JSON.parse(
        localStorage.getItem(Constants.TASKS) || "[]"
      );

      // Filter tasks by user own it or one of participant of it
      const filteredTasks = allTastks.filter(
        (t) => t.owner === userId || t.participants.includes(userId)
      );

      setTasks(filteredTasks);
    };

    getTasks();
  });

  return (
    <div className="w-full h-screen grid grid-cols-5 grid-rows-10 gap-2 pb-2 px-2">
      <img
        src={BG}
        alt=""
        loading="lazy"
        className="w-full h-full absolute -z-10 object-cover blur-2xl brightness-50"
      />

      <Header />

      <Navbar />

      <TaskGrid />
    </div>
  );
}

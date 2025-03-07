import { create } from "zustand";
import { CategoriesEnum, Task } from "../types/types";

interface Store {
  category: CategoriesEnum;
  tasks: Task[];

  setCategory: (c: CategoriesEnum) => void;
  setTasks: (t: Task[]) => void;
}

const useAppStore = create<Store>()((set) => ({
  category: CategoriesEnum.ALL,
  tasks: [],

  setCategory: (c) => set(() => ({ category: c })),
  setTasks: (t) => set(() => ({ tasks: t })),
}));

export default useAppStore;

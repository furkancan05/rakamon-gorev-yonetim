import { CategoriesEnum } from "../types/types";

export enum Constants {
  USERID = "USERID",
  TASKS = "TASKS",
}

export const Categories = [
  {
    id: 1,
    title: "Tüm Görevler",
    category: CategoriesEnum.ALL,
  },
  {
    id: 2,
    title: "Devam Edenler",
    category: CategoriesEnum.UNDONE,
  },
  {
    id: 3,
    title: "Tamamlandı",
    category: CategoriesEnum.DONE,
  },
  {
    id: 4,
    title: "Sahibi Olduğum Görevler",
    category: CategoriesEnum.OWNER,
  },
];

export enum CategoriesEnum {
  ALL = "ALL",
  UNDONE = "UNDONE",
  DONE = "DONE",
  OWNER = "OWNER",
}

export interface Task {
  id: string;
  title: string;
  content: string;
  owner: string;
  participants: string[];
  done: boolean;
}

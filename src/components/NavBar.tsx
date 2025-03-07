import Button from "./Button";
import useAppStore from "../store/store";
import { cn } from "../utils/cn";
import { Categories } from "../constants/constants";

export default function Navbar() {
  const category = useAppStore((store) => store.category);
  const setCategory = useAppStore((store) => store.setCategory);

  return (
    <nav className="col-span-5 col-start-1 row-start-8 row-span-3 md:col-span-1 md:col-start-1 md:row-span-9 md:row-start-2 h-full bg-white/10 p-5 rounded-md">
      <ul className="flex flex-col gap-5">
        {Categories.map((c) => (
          <Button
            key={c.id}
            onClick={() => setCategory(c.category)}
            className={cn("", { "bg-white/50": category !== c.category })}
          >
            {c.title}
          </Button>
        ))}
      </ul>
    </nav>
  );
}

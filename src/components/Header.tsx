import { useState } from "react";
import Button from "./Button";
import { LogOut } from "lucide-react";
import { Constants } from "../constants/constants";
import useAppStore from "../store/store";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const setTasks = useAppStore((store) => store.setTasks);

  const handleLogout = () => {
    setLoading(true);

    localStorage.setItem(Constants.USERID, "");
    window.location.href = "/login";
    setTasks([]);

    setLoading(false);
  };

  return (
    <div className="w-full h-16 col-span-5 flex items-center justify-between z-50">
      <div className="hidden md:block flex-1" />

      <h1 className="flex flex-1 justify-center text-base md:text-xl font-semibold text-white">
        Görev Yönetim Uygulaması
      </h1>

      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout} loading={loading}>
          <LogOut />
          <span>Çıkış</span>
        </Button>
      </div>
    </div>
  );
}

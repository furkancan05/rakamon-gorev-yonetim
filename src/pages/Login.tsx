import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Constants } from "../constants/constants";
import BG from "../assets/login-background.jpg";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    localStorage.setItem(Constants.USERID, userId);
    window.location.href = "/";

    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img
        src={BG}
        alt=""
        loading="lazy"
        className="w-full h-full absolute -z-10 object-cover blur-2xl brightness-50"
      />

      <form
        action="#"
        className="bg-white/10 p-5 rounded-md backdrop-blur-xl border-[1px] border-white/20"
      >
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-white text-center">
          Giriş
        </h2>

        <p className="text-white/60 mb-4 text-center">
          Görevler uygulamasının tüm özelliklerini <br /> özgürce kullanmak için
          giriş yapın.
        </p>

        <Input
          type="text"
          autoFocus={true}
          value={userId}
          maxLength={11}
          onChange={(e) => setUserId(e)}
          name="T.C. No"
          placeholder="T.C. Kimlik Numaranızı Giriniz"
        />

        <span className="text-xs text-white/60">
          T.C. Kimlik numaranız 11 haneden oluşmalıdır.
        </span>

        <Button
          onClick={handleLogin}
          disabled={userId.length !== 11}
          loading={loading}
          className="mt-4"
        >
          Giriş
        </Button>
      </form>
    </div>
  );
}

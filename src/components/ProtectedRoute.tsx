import React, { useEffect } from "react";
import { Constants } from "../constants/constants";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute(props: Props) {
  const navigate = useNavigate();

  const checkAuth = () => {
    const userId = localStorage.getItem(Constants.USERID);

    if (userId) return;

    navigate("/login");
  };

  useEffect(() => checkAuth(), []);

  return <>{props.children}</>;
}

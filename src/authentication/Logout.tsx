import { IoLogOut } from "react-icons/io5";

import { logoutThunk } from "./authThunk";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const svgStyle = { height: "20px", width: "20px" };

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLogOut, setIsLogOut] = useState(false);

  async function handleLogout() {
    setIsLogOut(true);
    try {
      const response = await dispatch(logoutThunk()).unwrap();
      console.log(response);

      navigate("/login");
    } catch (error: any) {
      if (error.message) toast.error(error.message);

      console.error(error);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLogOut}
      style={{
        all: "unset",
      }}
    >
      <IoLogOut
        style={{
          ...svgStyle,
          cursor: isLogOut ? "not-allowed" : "pointer",
        }}
      />
    </button>
  );
}

export default Logout;

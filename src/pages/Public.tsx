import React, { useEffect, useRef, useState, memo, ReactNode } from "react";
// import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
interface IProps {
  children: ReactNode;
}
const Public: React.FC<IProps> = ({ children }) => {
  const history = useNavigate();
  // const { setUser } = ChatState();
  useEffect(() => {
    const user = localStorage.getItem("token");

    if (!user) history("/login");
  }, [history]);
  return (
    <div
      className="flex h-[100%]"
      style={{
        background: "white",
        display: "flex",
      }}
    >
      {/* <Header /> */}
      <>{children}</>
    </div>
  );
};

export default memo(Public);

import React from "react";
import logo from "../../assets/logo.svg";

export const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 flex items-center px-9 justify-center border-y  bg-white">
        <div className="">
          <img src={logo} width="150" alt="Logo skydropx" />
        </div>
      </div>
    </>
  );
};

import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import InputData from "./InputData";
import { Outlet } from "react-router-dom";

const Main2 = () => {
  const [InputDiv, setInput] = useState("hidden");

  return (
    <div className=" lg:w-[90%] lg:h-[95vh] lg:border-white lg:border-2 lg:rounded-md lg:m-4 lg:p-2 lg:items-center lg:relative lg:overflow-auto       w-[90%] border-white border-2 rounded-md mt-10 ml-5 p-2 flex flex-col justify-items-center relative overflow-auto">
      <div
        className="cursor-pointer hover:-translate-x-4 transition ease-in-out w-[120px] h-[50px] bg-[#edea32] absolute right-[135px] top-4 rounded-full flex justify-center items-center font-semibold"
        onClick={() => setInput("fixed")}
      >
        <AddIcon /> Add Task
      </div>

      <Outlet />
      <InputData inputDiv={InputDiv} setInput={setInput} />
    </div>
  );
};

export default Main2;

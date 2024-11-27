import React, { useState, useEffect } from "react";
import Todo from "../components/Todo";
import AddIcon from "@mui/icons-material/Add";
import InputData from "../components/InputData";
import axios from "axios";
const AllTasks = () => {
  const [InputDiv, setInput] = useState("hidden");
  const [data, setData] = useState();

  const openModal = () => {
    setInput("fixed");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await axios.get(
          "http://localhost:4000/api/v2/all-tasks",
          { headers }
        );
        setData(response.data.data);
      };
      fetch();
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <div className="lg:w-[90%] lg:mt-16 lg:grid lg:grid-cols-3 lg:justify-items-center lg:gap-y-4 lg:overflow-auto lg:relative      w-full h-[71vh] mt-16 grid grid-flow-row-dense grid-cols-1 justify-items-center overflow-auto relative">
        {data?.tasks?.length >= 1 ? (
          <Todo setInput={setInput} data={data.tasks} />
        ) : (
          <div className="flex flex-col justify-center items-center text-4xl font-semibold      lg:w-full lg:flex lg:justify-center lg:items-center lg:text-4xl lg:font-semibold lg:col-span-3">
            No Tasks
          </div>
        )}

        {data?.tasks?.length >= 1 ? (
          <div
            className="hover:scale-105 transition ease-in-out cursor-pointer w-[280px] h-[230px] m-2 p-4 rounded-lg font-bold text-2xl bg-slate-500 opacity-50 flex flex-col justify-center items-center"
            onClick={openModal}
          >
            <span>
              <AddIcon />
            </span>
            Add Task
          </div>
        ) : (
          ""
        )}

        <InputData inputDiv={InputDiv} setInput={setInput} />
      </div>
    </>
  );
};

export default AllTasks;

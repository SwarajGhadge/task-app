import React, { useState, useEffect } from "react";
import Todo from "../components/Todo";
import axios from "axios";
const IncompletedTasks = () => {
  const [data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await axios.get(
          "https://task-app-project-5fao.onrender.com/api/v2/incompleted-tasks",
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
    <div className="lg:w-[90%] lg:mt-16 lg:grid lg:grid-cols-3 lg:justify-items-center lg:gap-y-4 lg:overflow-auto lg:relative    w-full h-[71vh] mt-16 grid frid-flow-row-dense grid-cols-1 justify-items-center overflow-auto ">
      {data?.length >= 1 ? (
        <Todo data={data} />
      ) : (
        <div className="flex flex-col justify-center items-center text-4xl font-semibold      lg:w-full lg:flex lg:justify-center lg:items-center lg:text-4xl lg:font-semibold lg:col-span-3">
          No Tasks
        </div>
      )}
    </div>
  );
};

export default IncompletedTasks;

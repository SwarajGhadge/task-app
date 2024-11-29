import axios from "axios";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
const InputData = ({ inputDiv, setInput }) => {
  const [data, setData] = useState({ title: "", desc: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const submitData = async () => {
    if (data.title === "" || data.desc === "") {
      toast.error("all fields required");
    } else {
      await axios.post("https://task-app-project-5fao.onrender.com/api/v2/create-task", data, {
        headers,
      });
      setData({ title: "", desc: "" });
      setInput("hidden");
      toast.success("Task created successfully");
    }
  };

  return (
    <>
      <div
        className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-90 h-screen w-full`}
      ></div>
      <div
        className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full text-white`}
      >
        <div className="lg:w-2/6 lg:bg-gray-900 lg:p-4 lg:rounded    w-[400px] bg-gray-900 p-4 rounded">
          <div className="flex justify-end ">
            <button
              className="hover:bg-gray-400 rounded-full p-2"
              onClick={() => setInput("hidden")}
            >
              <CloseIcon />
            </button>
          </div>
          <input
            type="text"
            placeholder="title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            onChange={change}
            value={data.title}
          />
          <textarea
            type="textarea"
            name="desc"
            id=""
            cols={10}
            rows={10}
            placeholder="Description"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            onChange={change}
            value={data.desc}
          ></textarea>
          <button
            className="px-3 py-2 bg-blue-500 rounded text-black text-xl font-semibold hover:text-blue-500 hover:bg-transparent hover:border-2 hover:border-blue-500"
            onClick={submitData}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;

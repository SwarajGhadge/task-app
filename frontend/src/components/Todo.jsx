import axios from "axios";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Todo = ({ data }) => {
  const navigate = useNavigate();
  const openModal = (id) => {
    navigate(`/edit-tasks/${id}`);
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const updateCompleted = async (id) => {
    try {
      await axios.put(
        `https://task-app-project-5fao.onrender.com/api/v2/updatecompleted-tasks/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://task-app-project-5fao.onrender.com/api/v2/delete-task/${id}`, {
        headers,
      });
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {data &&
        data.map((task) => {
          return (
            <div
              className="transition ease-in-out cursor-pointer w-[280px] h-[230px] flex flex-col items-start gap-3 mt-3 p-4 bg-[#fffecb] rounded-lg "
              key={task._id}
            >
              <span className="text-xl font-semibold">{task.title}</span>
              <p className="h-[100px] line-clamp-2">{task.desc}</p>
              <div className="w-full flex flex-row justify-between">
                <button
                  className={`${
                    task.isCompleted === false
                      ? "bg-yellow-400 font-semibold"
                      : "bg-green-600 text-white font-semibold"
                  } p-2 rounded hover:scale-105 hover:transition ease-in-out`}
                  onClick={() => updateCompleted(task._id)}
                >
                  {task.isCompleted === true ? "Completed" : "Incomplete"}
                </button>
                <div className="flex ">
                  <button
                    className="transition ease-in-out mr-2 bg-orange-500 text-white p-2 rounded-full hover:text-orange-500 hover:bg-transparent"
                    onClick={() => openModal(task._id)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="transition ease-in-out bg-red-700 text-white p-2 rounded-full hover:text-red-700 hover:bg-transparent"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Todo;

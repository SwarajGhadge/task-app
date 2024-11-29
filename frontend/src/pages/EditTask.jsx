import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await axios.get(
          `https://task-app-project-5fao.onrender.com/api/v2/edit-tasks/${id}`,
          { headers }
        );
        const data = await response.data;
        setTitle(data.data.title);
        // setTitle(data.title)
        setDesc(data.data.desc);
      };
      fetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://task-app-project-5fao.onrender.com/api/v2/update-task/${id}`,
        { title: title, desc: desc },
        { headers }
      );
      setTitle("");
      setDesc("");
      navigate("/");
      toast.success("Task updated");
    } catch (error) {
      toast.error("Internal server error");
    }
  };
  return (
    <>
      <div className={`top-0 left-0 bg-gray-800 h-screen w-full`}>
        <div
          className={`top-0 left-0 flex items-center justify-center h-screen w-full text-white`}
        >
          <div className="mainn">
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="px-3 py-2 rounded w-full bg-gray-700 my-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="textarea"
              name="desc"
              id=""
              cols={10}
              rows={10}
              placeholder="Description"
              className="px-3 py-2 rounded w-full bg-gray-700 my-3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>

            <button
              onClick={handleUpdate}
              className="px-3 py-2 bg-blue-500 rounded text-black text-xl font-semibold hover:text-blue-500 hover:bg-transparent hover:border-2 hover:border-blue-500"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTask;

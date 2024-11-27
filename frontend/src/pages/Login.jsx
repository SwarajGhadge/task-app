import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import toast from "react-hot-toast";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      navigate("/");
    } else if (isLoggedin === false) {
      navigate("/login");
    }
  }, []);

  const [Data, setData] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        toast.error("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/v1/login",
          { username: Data.username, password: Data.password }
        );

        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const [visibility, setVisibility] = useState(false);
  const changeVisibility = () => {
    setVisibility(!visibility);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-100">
      <div className="lg:w-[30%] lg:h-[50%] lg:gap-y-10 lg:rounded-2xl lg:shadow-2xl lg:flex lg:flex-col lg:justify-center lg:items-center     w-[80%] h-[50%] gap-y-10 rounded-2xl border shadow-2xl flex flex-col justify-center items-center">
        <h1 className=" text-4xl font-extrabold">Login</h1>

        <div className="w-full">
          <div className="w-full flex justify-around items-center">
            <label className="w-[30%] ml-5 text-lg font-medium">Username</label>
            <input
              type="text"
              className="w-[70%] h-10 mr-5 rounded-md bg-transparent border-2 pl-4 text-lg"
              name="username"
              value={Data.username}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-around items-center mt-4 relative">
            <label className="w-[30%] ml-5 text-lg font-medium">Password</label>
            <input
              type={visibility ? "text" : "password"}
              className="w-[70%] h-10 mr-5 rounded-md bg-transparent border-2 pl-4 text-lg "
              name="password"
              value={Data.password}
              onChange={handleChange}
            />
            {visibility ? (
              <VisibilityOffIcon
                onClick={() => changeVisibility()}
                className="absolute top-2 right-8 cursor-pointer"
              />
            ) : (
              <VisibilityIcon
                onClick={() => changeVisibility()}
                className="absolute top-2 right-8 cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="w-[90%] flex flex-col justify-center items-center gap-y-2">
          <button
            onClick={submit}
            className="w-[90%] mx-auto bg-sky-500 p-2 rounded-md text-white text-lg hover:bg-transparent hover: border-2  border-sky-500 hover:text-sky-500 hover:text-2xl hover:font-bold hover:shadow-xl"
          >
            Login
          </button>
          <p>
            Create a new account?
            <Link
              to={"/signup"}
              className="ml-2 text-lg text-sky-500 font-semibold hover:underline hover:border-sky-500 "
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { validateEmail } from "../components/helper";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      navigate("/");
    } else if (isLoggedin === false) {
      navigate("/signup");
    }
  }, []);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      if (username === "" || email === "" || password === "") {
        toast.error("All fields are required");
      } else if (!validateEmail(email)) {
        toast.error("Please enter a correct email address");
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/v1/signup",
          { username: username, email: email, password: password }
        );
        setUsername("");
        setEmail("");
        setPassword("");
        toast.success(response.data.message);
        navigate("/login");
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
    <div className="w-full h-screen bg-slate-100 flex justify-center items-center">
      <div className="lg:w-[30%] lg:h-[60%] lg:gap-y-10 lg:rounded-2xl lg:shadow-2xl lg:flex lg:flex-col lg:justify-center lg:items-center      w-[90%] h-[60%] gap-y-10 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
        <h1 className=" text-4xl font-extrabold  mt-10">Sign Up</h1>

        <div className="w-full">
          <div className="w-full flex justify-around items-center">
            <label className="w-[30%] ml-5 text-lg font-medium">Username</label>
            <input
              type="text"
              className="w-[70%] h-10 mr-5 rounded-md bg-transparent border-2 pl-4 text-lg"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-around items-center mt-4">
            <label className="w-[30%] ml-5 text-lg font-medium">Email</label>
            <input
              type="email"
              className="w-[70%] h-10 mr-5 rounded-md bg-transparent border-2 pl-4 text-lg"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-around items-center mt-4 relative">
            <label className="w-[30%] ml-5 text-lg font-medium">Password</label>
            <input
              type={visibility ? "text" : "password"}
              className="w-[70%] h-10 mr-5 rounded-md bg-transparent border-2 pl-4 text-lg"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            className="w-[90%] mx-auto bg-sky-500 p-2 rounded-md text-white text-lg  hover:bg-transparent hover: border-2 border-sky-500 hover:text-sky-500 hover:text-2xl hover:font-bold hover:shadow-xl"
          >
            Sign Up
          </button>
          <p>
            Already have an account?
            <Link
              to={"/login"}
              className="ml-2 text-lg text-sky-500 font-semibold hover:underline hover:border-sky-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

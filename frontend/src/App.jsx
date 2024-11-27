import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CompletedTask from "./pages/CompletedTask";
import IncompletedTasks from "./pages/IncompletedTasks";
import AllTasks from "./pages/AllTasks";
import Signup from "./pages/Signup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import EditTask from "./pages/EditTask";
import NotFoundPage from "./pages/NotFoundpage";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (isLoggedin === false) {
      navigate("/signup");
    }
  }, []);

  return (
    <>
      <div className="relative">
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route path="/" element={<AllTasks />} />
            <Route path="/completed-tasks" element={<CompletedTask />} />
            <Route path="/incompleted-tasks" element={<IncompletedTasks />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/edit-tasks/:id" element={<EditTask />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

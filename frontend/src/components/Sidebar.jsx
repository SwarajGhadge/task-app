import axios from "axios";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import MoreVertIcon from "@mui/icons-material/MoreVert";

//material ui
import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

const Sidebar = () => {
  //material ui
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  //normal
  const [data, setData] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.clear("id");
    localStorage.clear("token");
    dispatch(authActions.logout());
    navigate("/login");
    toast.success("Logout successfully");
  }

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
      toast.error(error.response.data.message);
    }
  }, []);
  return (
    <>
      <div className="lg:w-[20%] lg:h-[90vh] lg:flex lg:flex-col lg:justify-between lg:items-center lg:border-2 lg:border-white lg:rounded-md lg:m-4       border-2 border-white rounded-md m-4 flex justify-between items-center p-2 relative ">
        {data && (
          <div className="lg:w-full lg:flex lg:flex-col lg:items-start lg:pl-4 lg:pb-4 lg:justify-center lg:mt-4 lg:border-b-2       w-full flex flex-col items-start pl-4 pb-4 justify-center mt-4 ">
            <h3 className="text-3xl font-semibold">{data.username}</h3>
            <h6 className="text-lg font-normal">{data.email}</h6>
          </div>
        )}
        <div className="hidden lg:w-full lg:flex lg:flex-col lg:items-start lg:justify-center lg:gap-2 lg:font-semibold lg:text-xl lg:p-4">
          <Link to="/" className="w-full">
            <div className="py-2 pl-2 w-full hover:bg-slate-100 hover:text-black transition ease-in-out">
              <FormatListBulletedIcon className="mr-4" />
              All Tasks
            </div>
          </Link>
          <Link to="/completed-tasks" className="w-full">
            <div className="py-2 pl-2 w-full hover:bg-slate-100 hover:text-black transition ease-in-out">
              <DoneAllIcon className="mr-4" />
              Completed Tasks
            </div>
          </Link>
          <Link to="/incompleted-tasks" className="w-full">
            <div className="py-2 pl-2 w-full hover:bg-slate-100 hover:text-black transition ease-in-out ">
              <RemoveDoneIcon className="mr-4" />
              Incompleted Tasks
            </div>
          </Link>
        </div>

        <div className="hidden lg:w-full lg:mb-10 lg:border-t-2 lg:flex lg:justify-center">
          <button
            className="bg-[#edea32] drop-shadow-xl mt-6 rounded-full w-[150px] h-10 font-semibold text-lg  transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300"
            onClick={handleLogout}
          >
            <LogoutIcon className="mr-2" />
            Log Out
          </button>
        </div>

        <div className="lg:hidden">
          <Stack direction="row" spacing={2}>
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <div className="rounded-full bg-yellow-300 p-2">
                  <MoreVertIcon className=" text-black" />
                </div>
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper className="relative top-[-90px] right-[56px] h-[164px] w-[150px] font-semibold">
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <Link to="/" className="w-full">
                            <div className="py-2 pl-2 w-full hover:bg-slate-100 hover:text-black transition ease-in-out ">
                              All Tasks
                            </div>
                          </Link>
                          <Link to="/completed-tasks" className="w-full">
                            <div className="py-2 pl-2 w-full hover:bg-slate-100 hover:text-black transition ease-in-out ">
                              Completed Tasks
                            </div>
                          </Link>
                          <Link to="/incompleted-tasks" className="w-full">
                            <div className="py-2 pl-2 w-full hover:bg-slate-100 hover:text-black transition ease-in-out ">
                              Incompleted Tasks
                            </div>
                          </Link>
                          <div
                            onClick={handleLogout}
                            className="py-2 pl-2 w-full hover:bg-slate-100 hover:text-black transition ease-in-out "
                          >
                            Logout
                          </div>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

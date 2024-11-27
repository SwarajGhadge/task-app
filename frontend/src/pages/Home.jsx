import React from "react";
import Sidebar from "../components/Sidebar";
import Main2 from "../components/Main2";

const Home = () => {
  return (
    <div className="w-full bg-[#37afe1] lg:flex lg:flex-row    flex flex-col">
      <Sidebar />
      <Main2 />
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import "./Home.css";
import SideBar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { sidebar, category } = useOutletContext();

  return (
    <>
      <div className={`container ${sidebar || "large-container"}`}>
        <Feed category={category} />
      </div>
    </>
  );
};

export default Home;

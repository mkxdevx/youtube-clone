import React, { useState } from "react";
import "./SidebarLayout.css";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const SidebarLayout = ({ sidebar, category, setCategory }) => {
  return (
    <div className="layout-with-sidebar">
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />
      <main className="content">
        <Outlet context={{ sidebar, category, setCategory }}/>
      </main>
    </div>
  );
};

export default SidebarLayout;

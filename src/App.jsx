import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";
import Search from "./pages/Search/Search";
import SidebarLayout from "./components/Layouts/SidebarLayout";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [category, setCategory] = useState(0);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route
          element={
            <SidebarLayout
              sidebar={sidebar}
              category={category}
              setCategory={setCategory}
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;

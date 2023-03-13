import React from "react";
import { Main } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Petindex from "./pages/Petindex";
import Latestsearch from "./pages/Latestsearch";
import Auth from "./api/auth";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Petindex" element={<Petindex />} />
      <Route path="/Latestsearch" element={<Latestsearch />} />
      <Route path="/oauth/kakao/callback" element={<Auth />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
};

export default App;

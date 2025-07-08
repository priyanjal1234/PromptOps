import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Register from "./pages/Register";
import AllSet from "./components/AllSet";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element = {<Login />}/>
      <Route path="/all-set" element={<AllSet />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;

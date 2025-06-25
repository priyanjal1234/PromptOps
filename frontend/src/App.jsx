import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Register from "./pages/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element = {<Onboarding />} />
      <Route path="/register" element = {<Register />} />
    </Routes>
  );
};

export default App;

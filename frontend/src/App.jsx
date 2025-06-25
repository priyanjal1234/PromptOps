import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element = {<Onboarding />}/>
    </Routes>
  );
};

export default App;

import React, { useState } from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Todo from "./pages/Todo.jsx";
import Completed from "./pages/Completed.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="completed" element={<Completed />} />
        <Route path="dashboard" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;

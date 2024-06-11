import React from "react";
import Dashboard from "./components/Dashboard";
import Login_Register from "./components/Login_Register";
import { Routes as Router, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="text-3xl flex justify-center m-10">
        Task Board With Drag and drop (Backend mongoDB)
      </div>
      <Dashboard />
    </>
  );
};

export default App;

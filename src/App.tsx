import React from "react";
import PinCodeForm from "./components/PinCodeForm";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div className="App">
      <Toaster />
      <AppRouter />
      <Outlet />
    </div>
  );
}

export default App;

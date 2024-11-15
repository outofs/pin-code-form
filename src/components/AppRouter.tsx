import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import PinCodeForm from "./PinCodeForm";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="header">
        <div>
          <img
            src="/assets/logo-transparent-old.png"
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </div>
      </div>
      <Routes>
        <Route>
          <Route path="/">
            <Route path=":code" element={<PinCodeForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

import React from "react";
import PinCodeForm from "./components/PinCodeForm";

function App() {
  return (
    <div className="App">
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
      <PinCodeForm />
    </div>
  );
}

export default App;

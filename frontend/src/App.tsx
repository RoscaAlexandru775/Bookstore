import React from "react";
import MainContext from "./contexts/mainContext";
import Router from "./router/index";
import "./App.css";

function App() {
  return (
    <>
      <MainContext>
        <Router />
      </MainContext>
    </>
  );
}

export default App;

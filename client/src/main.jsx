import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
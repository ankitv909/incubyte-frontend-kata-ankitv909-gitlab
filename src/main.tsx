import React from "react";
import ReactDOM from "react-dom/client";
import { AppProviders } from "./app/AppProviders";
import { App } from "./app/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
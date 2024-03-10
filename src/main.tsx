import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TabProvider } from "./context/tabContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TabProvider>
      <App />
    </TabProvider>
  </React.StrictMode>
);

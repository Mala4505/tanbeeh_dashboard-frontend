import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import createTheme from "../theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={createTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);

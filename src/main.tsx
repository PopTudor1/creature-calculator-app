import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CreatureCalculator from "./creature-calculator.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CreatureCalculator />
  </StrictMode>
);

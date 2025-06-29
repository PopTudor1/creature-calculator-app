import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CreatureCalculator from "./creature-calculator.tsx";
import "./styles/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CreatureCalculator />
  </StrictMode>
);

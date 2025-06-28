import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CreatureCalculator from "./creature-calculator.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CreatureCalculator />
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import './fonts.css';
import { BrowserRouter } from "react-router-dom";
import BackgroudVectorPurpl from './assets/icons/backgroud_vector_purpl.svg'
import BackgroudVectorGreen from './assets/icons/backgroud_vector_green.svg'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <img className="back-img green" src={BackgroudVectorGreen}/>
      <img className="back-img purple" src={BackgroudVectorPurpl}/>
    </BrowserRouter>
  </StrictMode>
);

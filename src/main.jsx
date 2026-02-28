import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ContactProvider } from "./Context/ContactContext";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
    <ContactProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ContactProvider>
);
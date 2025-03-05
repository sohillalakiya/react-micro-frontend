import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainApp from './Main';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MainApp/>
  </StrictMode>
);

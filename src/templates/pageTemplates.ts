import { componentReact, componentImport, metamaskImport } from "./imports.js";
import { capitalize } from "../utils.js";
import { ABI } from "../types";

export const indexHtml = (name: string) => {
  return {
    name: "index",
    extension: ".html",
    file: `
<!DOCTYPE html>
<html>

<head>
    <title>${name}</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id="root"></div>
</body>

</html>
`,
  };
};

export const indexFile = (useTs: boolean) => {
  return {
    name: "index",
    extension: `${useTs ? ".tsx" : ".jsx"}`,
    file: `
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
  };
};

export const appFile = (functions: ABI[], useTs: boolean)=> {
  return {
    name: "App",
    extension: `${useTs ? ".tsx" : ".jsx"}`,
    file: `
import React from 'react';
${metamaskImport()}
${functions.map(({ name }) => componentImport(name, ".")).join("\n")}

export default function App() {
  return (
    <div className="home-page">
      ${functions.map(({ name }) => componentReact(name)).join("\n")}
    </div>
  )
}
`,
  };
};

export const typeDeclaration = () => {
  return {
    name: "types.d",
    tsOnly: true,
    extension: ".ts",
    file: `
import { MetaMaskInpageProvider } from "@metamask/providers";
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}`,
  };
};

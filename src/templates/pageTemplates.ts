import { componentReact, componentImport } from './componentImports.js'
import { capitalize } from '../utils.js'
import { ABI } from '../types'

export const indexHtml = (name: string) => {
  return {
  name: 'index',
  extension: '.html',
  file: 
`
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
`
}}

export const indexFile = {
  name: "index",
  extension: '.tsx',
  file: 
`
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

export const appFile = (functions: ABI[]) => {
  return {
    name: "App",
    extension: '.tsx',
    file: `
import React from 'react';
${functions.map(( {name }) => componentImport(name, '.')).join("\n")}

export default function App() {
  return (
    <div className="home-page">
      ${functions.map(( {name }) => componentReact(name)).join("\n")}
    </div>
  )
}
`,
  };
};

// export const functionImportPage = (functions: ABI[]) => {
//   return {
//     name: 'functions',
//     extension: '.tsx',
//     file: 
// `${functions.map(( {name }) => componentImport(name)).join("\n")}

// export {
// ${functions.map(( {name }) => capitalize(name)).join(",\n")}
// }`
//   }
// }

export const typeDeclaration = () => {
  return {
    name: "types.d",
    extension: '.ts',
    file: `
import { MetaMaskInpageProvider } from "@metamask/providers";
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}`
}}

import { componentReact, componentImport } from "./imports.js";
import { propsFilter } from "../utils.js";
import Nav from "./nav.js";
import { useStateObject, stateType, handleChangeArray } from "./utilSnippets.js";
import { ABI, CompProps } from "../types";
import theme from "./theme.js";

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


createRoot(document.getElementById("root")${useTs ? "!" : ""}).render(
  <StrictMode>
    <App />
  </StrictMode>
);

`,
  };
};

export const appFile = (functions: ABI[], useTs: boolean, props: any[]) => {
  return {
    name: "App",
    extension: `${useTs ? ".tsx" : ".jsx"}`,
    file: `
import React, { useState } from 'react';
import './App.css';
import Footer from './Footer';
import Details from './Details';
import ${theme(useTs).name} from './${theme(useTs).name}';
${componentImport(Nav(useTs).name, "./")}
${functions.map(({ name }) => componentImport(name, "./components/")).join("\n")}

${
  props && useTs ?
  `${stateType("masterLogs", "any[]", true ).function}`  : ""
}

export default function App() {
  const [theme, setTheme] = useState("dark")
  ${useStateObject(useTs, "masterLogs", "[]").function}

${handleChangeArray(useTs, "masterLogs", "data", "none").function}

  const handleTheme = () => {
    setTheme(${theme(useTs).name}(theme))
  }
  return (
    <div className="App">
    <Nav handleTheme={handleTheme} />
    <Details masterLogs={masterLogs} />
      <div className="components">
        ${functions.map(({ name, outputs }) => componentReact(name, propsFilter(props, outputs)),).join("\n")}
      </div>
    <Footer />
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

export const details = (useTs: boolean, props: CompProps[]) => {
  return {
    name: "Details",
    extension: `${useTs ? ".tsx" : ".jsx"}`,
    file:`
import React, { useState } from 'react';
${ useTs ?
`type Props = {
  masterLogs: string[];
}` : "" }
export default function Details(props${useTs ? ": Props" : ""}) {
  const { masterLogs } = props
  const { ethereum } = window;

  const logs = (key${ useTs ? ": string" : ""}, value${ useTs ? ": string" : ""}, index${ useTs ? ": number" : ""}) => {
    return (
      <div key={index} className="log-box">
        <p className="text-extra">{key}: <span className="log-text">{value}</span></p>
      </div>
    )
  }

  const logMap = (items${ useTs ? ": any" : ""}) => {
    if (items) {
      if (items.length > 0) {
        return items.map((item${ useTs ? ": any" : ""}, index${ useTs ? ": number" : ""}) => {
          return logs(item[0], item[1], index);
        })
      }
    }
  }

  return (
    <div className="connection-details">
      <h1>Connection Details</h1>
      {
        ethereum && (
          <div className="details-box">
            <p>chainId: {ethereum?.chainId}</p>
            <p>networkVersion: {ethereum?.networkVersion}</p>
            <p>isMetaMask: {ethereum?.isMetaMask ? "true" : "false"}</p>
            <p>selectedAddress:</p>
            <p>{ethereum?.selectedAddress}</p>
          </div>
        )
      }
      <h1>Logs:</h1>
      <div className="logs">
        {logMap(masterLogs)}
      </div>
    </div>
  )
}`
  }
}

export const footer = (useTs: boolean) => {
  return {
    name: "Footer",
    extension: `${useTs ? ".tsx" : ".jsx"}`,
    file: `
import React from 'react';
export default function Footer() {
  return (
    <div className="footer">
      <p>created by Seyaji</p>
      <p>
        ░█████╗░██████╗░███████╗██╗░░░░░░█████╗░███╗░░██╗████████╗███████╗
        ██╔══██╗██╔══██╗██╔════╝██║░░░░░██╔══██╗████╗░██║╚══██╔══╝██╔════╝
        ███████║██║░░██║█████╗░░██║░░░░░███████║██╔██╗██║░░░██║░░░█████╗░░
        ██╔══██║██║░░██║██╔══╝░░██║░░░░░██╔══██║██║╚████║░░░██║░░░██╔══╝░░
        ██║░░██║██████╔╝███████╗███████╗██║░░██║██║░╚███║░░░██║░░░███████╗
        ╚═╝░░╚═╝╚═════╝░╚══════╝╚══════╝╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░╚══════╝
      </p>
      <p>Eth address: 0x4A079D4417b522762C72dB9643234FCC4683a40E</p>
      <a href="https://github.com/Seyaji">GitHub</a>
    </div>
  )
}
`
  };
}

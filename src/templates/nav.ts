export default function Nav(useTs: boolean) {
  return (
    { name: "Nav",
      extension: `${useTs ? ".tsx" : ".jsx"}`,
      file: 
`
import React from 'react';
import Metamask from './Metamask';
${ useTs ? 
`interface Props {
  handleTheme: () => void;
};` : ""
}

export default function Nav(props${useTs ? ": Props" : ""}){
  const { handleTheme } = props;
  return (
    <nav>
      <button onClick={handleTheme} >change theme</button>
      <p id="nav-text">
      ░█████╗░██████╗░███████╗██╗░░░░░░█████╗░███╗░░██╗████████╗███████╗
      ██╔══██╗██╔══██╗██╔════╝██║░░░░░██╔══██╗████╗░██║╚══██╔══╝██╔════╝
      ███████║██║░░██║█████╗░░██║░░░░░███████║██╔██╗██║░░░██║░░░█████╗░░
      ██╔══██║██║░░██║██╔══╝░░██║░░░░░██╔══██║██║╚████║░░░██║░░░██╔══╝░░
      ██║░░██║██████╔╝███████╗███████╗██║░░██║██║░╚███║░░░██║░░░███████╗
      ╚═╝░░╚═╝╚═════╝░╚══════╝╚══════╝╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░╚══════╝
      </p>
      <Metamask />
    </nav>
  )
}`
    }
  )
}
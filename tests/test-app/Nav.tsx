
import React from 'react';
import Metamask from './Metamask';
interface Props {
  handleTheme: () => void;
};

export default function Nav(props: Props){
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
}
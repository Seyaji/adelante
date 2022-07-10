export default function metamask(useTs: boolean) {
  return ({
    name: "metamask",
    extension: `${useTs ? ".tsx" : ".jsx"}`,
    file: 
`
import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";

const Metamask = () => {

  const [errorMessage, setErrorMessage] = useState${useTs ? "<string>" : ""}("");
  const [account, setAccount] = useState${useTs ? "<string>" : ""}("");
  const [balance, setBalance] = useState${useTs ? "<string>" : ""}("");

  useEffect(() => {
    if (window.ethereum) {
      console.log("Metamask detected");
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
      localAccounts()
    }
  }, []);


  const getBalance = async (account: any) => {
    return await window.ethereum.request({
      method: "eth_getBalance",
      params: [account.toString(), "latest"],
    });
  }

  const localAccounts = () => {
    try {
      const local = JSON.parse(localStorage.getItem("account") || "none")
      if (local.length > 40) {
        console.log(local)
        setAccount(local)
        accountsChanged(local)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accountsChanged(res[0]);
      } catch (err) {
        console.log(err);
        setErrorMessage("Couldn't connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };


  const accountsChanged = async (newAccount: string) => {
    setAccount(newAccount);
    setErrorMessage("");
    localStorage.setItem("account", JSON.stringify(newAccount));
    try {
      const balance = await getBalance(newAccount)
      ${useTs ? "// @ts-ignore" : ""}
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.log(err);
      setBalance("")
      setAccount("")
      setErrorMessage("Couldn't connecting to MetaMask");
    }
  };

  const chainChanged = () => {
    setErrorMessage(null);
    setAccount(null);
    setBalance(null);
  };

  const Connect = () => {
    return (
      <button onClick={() => connectHandler()}>Connect Metamask</button>
    )
  }

  return (
    <div id='balance'>
      {account !== "" ? <p>{errorMessage} Balance: { balance } ETH</p> : <Connect />}
    </div>
  );
}
export default Metamask
`})
}
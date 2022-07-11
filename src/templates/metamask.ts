export default function metamask(useTs: boolean) {
  return ({
    name: "Metamask",
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

  useEffect(() => {
    if (account) {
      console.log("account: ", account);
      getBalance(account);
    }
  }, [account])

  const getBalance = async (account${useTs ? ": any" : ""}) => {
    try {
      return await window.ethereum.request({
        method: "eth_getBalance",
        params: [account.toString(), "latest"],
      });
    } catch (error) {
      console.log("Failed to retrive balance");
    }
  }

  const getAccount = async () => {
    try {
      ${useTs ? "// @ts-ignore" : ""}
      const res${useTs ? ": string[]" : ""} = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(res[0]);
      localStorage.setItem("account", JSON.stringify(res[0]));
      return res[0];
    } catch (err) {
      console.log(err)
    }
  }

  const localAccounts = async () => {
    try {
      const local = JSON.parse(localStorage.getItem("account") || "none")
      if (local.length > 40) {
        setAccount(local)
        const balance = await getBalance(local)${useTs ? " as BigInteger" : ""};
        setBalance(ethers.utils.formatEther(balance))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const acc = await getAccount()
        if (acc) {
          await accountsChanged()
        }
      } catch (err) {
        console.log(err);
        setErrorMessage("Couldn't connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };


  const accountsChanged = async () => {
    try {
      const newAccount = await getAccount();
    if (newAccount) {
      setAccount(newAccount);
      const balance = await getBalance(newAccount)${useTs ? " as BigInteger" : ""};
      setBalance(ethers.utils.formatEther(balance));
      setErrorMessage("");
      localStorage.setItem("account", JSON.stringify(newAccount));
    }
    } catch (err) {
      console.log(err);
      setBalance("")
      setAccount("")
      setErrorMessage("Couldn't connect to MetaMask");
    }
  };

  const chainChanged = () => {
    (async () => {
      const acc = await getAccount()
      if (acc) {
        localStorage.setItem("account", JSON.stringify(acc));
        await accountsChanged()
      }
    })();
    setErrorMessage("");
  };

  const Connect = () => {
    return (
      <button onClick={() => connectHandler()}>Connect Metamask</button>
    )
  }

  return (
    <div id='balance'>
      {account !== "" ? <p>{errorMessage} Balance: {balance} ETH</p> : <Connect />}
    </div>
  );
}
export default Metamask
`})
}
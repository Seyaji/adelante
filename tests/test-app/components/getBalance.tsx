import React from 'react';
import getBalance from '../functions/getBalance';

type Props = {
  handleMasterLogsChange: (data: any) => void;
};




export default function GetBalance(props : Props) {
  const { handleMasterLogsChange } = props
  
  
  const handleLogsClick = async (event: any) => {
    const data = await getBalance()
    const outcome = data === "getBalance failed" ? "failed" : `success: ${JSON.stringify(data)}`
    handleMasterLogsChange(["getBalance", outcome])
  }

  return (
    <div className="function-box">
      <div className="box-heading">
        <h1>Get Balance</h1>
        <span className="text-extra"><p>getBalance</p></span>
      </div>
          
        <button className="box-button" onClick={handleLogsClick} value="" >getBalance</button>
    </div>
  )
}

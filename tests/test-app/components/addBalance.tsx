import React from 'react';
import addBalance from '../functions/addBalance';

type Props = {
  handleMasterLogsChange: (data: any) => void;
};




export default function AddBalance(props : Props) {
  const { handleMasterLogsChange } = props
  
  
  const handleLogsClick = async (event: any) => {
    const data = await addBalance()
    const outcome = data === "addBalance failed" ? "failed" : `success: ${JSON.stringify(data)}`
    handleMasterLogsChange(["addBalance", outcome])
  }

  return (
    <div className="function-box">
      <div className="box-heading">
        <h1>Add Balance</h1>
        <span className="text-extra"><p>addBalance</p></span>
      </div>
          
        <button className="box-button" onClick={handleLogsClick}>addBalance</button>
    </div>
  )
}

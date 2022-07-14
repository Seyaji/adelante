import React from 'react';
import getNumber from '../functions/getNumber';

type Props = {
  handleMasterLogsChange: (data: any) => void;
};




export default function GetNumber(props : Props) {
  const { handleMasterLogsChange } = props
  
  
  const handleLogsClick = async (event: any) => {
    const data = await getNumber()
    const outcome = data === "getNumber failed" ? "failed" : `success: ${JSON.stringify(data)}`
    handleMasterLogsChange(["getNumber", outcome])
  }

  return (
    <div className="function-box">
      <div className="box-heading">
        <h1>Get Number</h1>
        <span className="text-extra"><p>getNumber</p></span>
      </div>
          
        <button className="box-button" onClick={handleLogsClick}>getNumber</button>
    </div>
  )
}

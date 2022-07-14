import React, { useState } from 'react';
import returnSum from '../functions/returnSum';

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

type State = {
  [key: string]: string
};




export default function ReturnSum(props : Props) {
  const { handleMasterLogsChange } = props
  const [state, setState] = useState<State>({});
    
  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
    
  }
    
  
  const handleLogsClick = async (event: any) => {
    const data = await returnSum(state?._a ,state?._b)
    const outcome = data === "returnSum failed" ? "failed" : `success: ${JSON.stringify(data)}`
    handleMasterLogsChange(["returnSum", outcome])
  }

  return (
    <div className="function-box">
      <div className="box-heading">
        <h1>Return Sum</h1>
        <span className="text-extra"><p>returnSum</p></span><p>Function inputs:</p>
          <p>(<span className="text-extra">uint256 _a:</span> number, <span className="text-extra">uint256 _b:</span> number)</p>
      </div>
          
      <div className="box-inputs">
        <p>_a</p>
        <input aria-label="_a" name="_a" onChange={handleStateChange} type="number" placeholder="_a"/>
          <p>_b</p>
        <input aria-label="_b" name="_b" onChange={handleStateChange} type="number" placeholder="_b"/>
      </div>

        <button className="box-button" onClick={handleLogsClick}>returnSum</button>
    </div>
  )
}

import React, { useState } from 'react';
import withdrawBalance from '../functions/withdrawBalance';

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

type State = {
  [key: string]: string
};




export default function WithdrawBalance(props : Props) {
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
    const data = await withdrawBalance(state?.amount)
    const outcome = data === "withdrawBalance failed" ? "failed" : `success: ${JSON.stringify(data)}`
    handleMasterLogsChange(["withdrawBalance", outcome])
  }

  return (
    <div className="function-box">
      <div className="box-heading">
        <h1>Withdraw Balance</h1>
        <span className="text-extra"><p>withdrawBalance</p></span><p>Function inputs:</p>
          <p>(<span className="text-extra">uint256 amount:</span> number)</p>
      </div>
          
      <div className="box-inputs">
        <p>amount</p>
        <input name="amount" onChange={handleStateChange} type="number" placeholder="amount"/>
      </div>

        <button className="box-button" onClick={handleLogsClick} value="" >withdrawBalance</button>
    </div>
  )
}

import React, { useState } from 'react';
import storeNumber from '../functions/storeNumber';

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

type State = {
  [key: string]: string
};




export default function StoreNumber(props : Props) {
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
    const data = await storeNumber(state?._number)
    const outcome = data === "storeNumber failed" ? "failed" : `success: ${JSON.stringify(data)}`
    handleMasterLogsChange(["storeNumber", outcome])
  }

  return (
    <div className="function-box">
      <div className="box-heading">
        <h1>Store Number</h1>
        <span className="text-extra"><p>storeNumber</p></span><p>Function inputs:</p>
          <p>(<span className="text-extra">uint256 _number:</span> number)</p>
      </div>
          
      <div className="box-inputs">
        <p>_number</p>
        <input aria-label="_number" name="_number" onChange={handleStateChange} type="number" placeholder="_number"/>
      </div>

        <button className="box-button" onClick={handleLogsClick}>storeNumber</button>
    </div>
  )
}

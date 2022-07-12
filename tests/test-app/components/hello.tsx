import React from 'react';
import hello from '../functions/hello';

type Props = {
  handleMasterLogsChange: (data: any) => void;
};




export default function Hello(props : Props) {
  const { handleMasterLogsChange } = props
  
  
  const handleLogsClick = async (event: any) => {
    const data = await hello()
    const outcome = data === "hello failed" ? "failed" : `success: ${JSON.stringify(data)}`
    handleMasterLogsChange(["hello", outcome])
  }

  return (
    <div className="function-box">
      <div className="box-heading">
        <h1>Hello</h1>
        <span className="text-extra"><p>hello</p></span>
      </div>
          
        <button className="box-button" onClick={handleLogsClick} value="" >hello</button>
    </div>
  )
}

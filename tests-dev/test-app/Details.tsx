
import React, { useEffect, useState } from 'react';
type Props = {
  masterLogs: string[];
}
export default function Details(props: Props) {
  const { masterLogs } = props
  const { ethereum } = window;
  const [state, setState ] = useState({})

  const logs = (key: string, value: string, index: number) => {
    return (
      <div key={index} className="log-box">
        <p className="text-extra">{key}: <span className="log-text">{value}</span></p>
      </div>
    )
  }

  const logMap = (items: any) => {
    if (items) {
      if (items.length > 0) {
        return items.map((item: any, index: number) => {
          return logs(item[0], item[1], index);
        })
      }
    }
  }

  return (
    <div className="connection-details">
      <h1>Connection Details</h1>
      {
        ethereum && (
          <div className="details-box">
            <p>chainId: {ethereum?.chainId}</p>
            <p>networkVersion: {ethereum?.networkVersion}</p>
            <p>isMetaMask: {ethereum?.isMetaMask ? "true" : "false"}</p>
            <p>selectedAddress:</p>
            <p>{ethereum?.selectedAddress}</p>
          </div>
        )
      }
      <h1>Logs:</h1>
      <div className="logs">
        {logMap(masterLogs)}
      </div>
    </div>
  )
}
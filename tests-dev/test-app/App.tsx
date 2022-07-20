
import React, { useState } from 'react';
import './App.css';
import Footer from './Footer';
import Details from './Details';
import changeTheme from './changeTheme';
import Nav from './Nav';
import ReturnSum from './components/returnSum';
import StoreNumber from './components/storeNumber';
import WithdrawBalance from './components/withdrawBalance';
import AddBalance from './components/addBalance';
import GetBalance from './components/getBalance';
import GetNumber from './components/getNumber';
import Hello from './components/hello';

type MasterLogs = any[];

export default function App() {
  const [theme, setTheme] = useState("dark")
  const [masterLogs, setMasterLogs] = useState<MasterLogs>([]);

  const handleMasterLogsChange = (data: any) => {
    setMasterLogs(prevState => [data, ...prevState])
  }

  const handleTheme = () => {
    setTheme(changeTheme(theme))
  }
  return (
    <div className="App">
    <Nav handleTheme={handleTheme} />
    <Details masterLogs={masterLogs} />
      <div className="components">
              <ReturnSum handleMasterLogsChange={handleMasterLogsChange} />
      <StoreNumber handleMasterLogsChange={handleMasterLogsChange} />
      <WithdrawBalance handleMasterLogsChange={handleMasterLogsChange} />
      <AddBalance handleMasterLogsChange={handleMasterLogsChange} />
      <GetBalance handleMasterLogsChange={handleMasterLogsChange} />
      <GetNumber handleMasterLogsChange={handleMasterLogsChange} />
      <Hello handleMasterLogsChange={handleMasterLogsChange} />
      </div>
    <Footer />
    </div>
  )
}

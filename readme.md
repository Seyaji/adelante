# Adelante

## what is adelante?
https://www.npmjs.com/package/adelante

This is a code generation tool to aid in the rapid prototyping of smart contracts built with solidity.

See it in action at: https://adelante-test-app.vercel.app/

As of version 1.1.6 you can:
- generate inline functions or extract them to their own files
- generate inline components or extract them to their own files
- use a combination of the two, e.g inline functions and extracted components
- generate javascript files
- define the output path in the adelante.json

It automatically:
- generates metamask connect fucntionality and component
- generates a css file
- generates a html file
- generates an App.*sx file populated with the generated components

Other functionality:

It logs function calls and the return data from them (if any)

<img width="918" alt="Screenshot 2022-07-12 at 15 44 04" src="https://user-images.githubusercontent.com/67058118/178523396-0a4cb111-79c5-4fe8-8a10-1597d2e7d6f9.png">

Features in development before 1.2.0
- generate test files for the generated files - in development 
- add more args processing when calling npx (generate components only, generate functions only, etc)

Planned features: 
- make html,index and app file generation optional (components and functions only formatted for general use)
- user defined themes

if you like it, send me a coffee :)

Eth address: 0x4A079D4417b522762C72dB9643234FCC4683a40E
## how can I make it work??

Make sure that you have a package.json file before you install adelante.
You can make one with the following command:

```
npm init
```

or
```
yarn init
```


Then install adelante with the following command:


run:

```
npm install adelante
```

or

```
yarn add adelante
```

then run:

```
npx adelante --init
```
you will be asked some questions to configure adelante.json
if you want to use a default configuration and edit the json manually pick 'No' for the first question

then to generate the files use:
```
npx adelante 
```


it's reccomended that you

- copy your abi file into the root project directory
- define the path to your abi file in the adelante .json file (if you didnt do it when you generated the adelante file)
- it will genrate without a contract address but one should be addded if you want to it to work properly


```json
{
  "useTypescript": true,
  "inlineFunctions": false,
  "inlineComponents": false,
  "abiPath": "/abi.json", // Path to the abi.file from your smart contract (it must be in your project directory)
  "contractAddress": "ENTER_CONTRACT_ADDRESS_HERE",
  "projectPath": "/my-app/src" // Path to app directory, if you want to use create-react-app the path should be to the src file 
}

```



## Currently it:

### Creates functions to interact with smart contract functions

The functions will return data if it is expected, otherwise it will not generate a return statement.

Things to note: 

- with payable functions an ethers.utils.parseEther() is generated in the function file but an amount is not provided

how come? 
payable functions dont require the ether amount to de defined as an argument in the function inputs (these are recorded in the contract abi which is the source for the code generation)

```js
import { getContract } from '../utils/utils'
/* 
if the function is payable it will use: 
import { ethers } from 'ethers';

and modify the function call to include it:
await contract.getRemainingUnits({ value: ethers.utils.parseEther("0.00")});
*/

export default async function getRemainingUnits() {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    const data = await contract.getRemainingUnits();
    return data;
  }
  catch (error) {
    console.log(error);
    return "getRemainingUnits failed";
  }
}
```
### Creates React components for the functions
These components have inputs and a button to call the smart contract function along with state and a handleChange function

<img width="323" alt="Screenshot 2022-07-12 at 16 10 54" src="https://user-images.githubusercontent.com/67058118/178523907-2d513920-4ef4-4d65-b079-8677e41d9ce4.png">

<img width="326" alt="Screenshot 2022-07-12 at 16 12 04" src="https://user-images.githubusercontent.com/67058118/178524096-7b363ac9-084f-4f42-8eec-febaae740f98.png">


```jsx
import React, { useState } from 'react';
import purchaseUnit from '../functions/purchaseUnit';

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

type State = {
  [key: string]: string
};

export default function PurchaseUnit(props : Props) {
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
    const data = await purchaseUnit(state?._amount)
    const outcome = data === "purchaseUnit failed" ? "failed" : `success: ${JSON.stringify(data)}`
    handleMasterLogsChange(["purchaseUnit", outcome])
  }

  return (
    <div className="function-box">
      <div className="box-heading">
        <h1>Purchase Unit</h1>
        <span className="text-extra"><p>purchaseUnit</p></span><p>Function inputs:</p>
          <p>(<span className="text-extra">uint16 _amount:</span> number)</p>
      </div>
          
      <div className="box-inputs">
        <p>_amount</p>
        <input name="_amount" onChange={handleStateChange} type="number" placeholder="_amount"/>
      </div>

        <button className="box-button" onClick={handleLogsClick} value="" >purchaseUnit</button>
    </div>
  )
}

```
### Populates the appfile with the components
It will create the imports and pass props down to the child components for the masterLogsState

```jsx
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

```


# Adelante

## what is adelante?
https://www.npmjs.com/package/adelante

This is a code generation tool to aid in the rapid prototyping of Smart Contracts built with Solidity.

See it in action at: https://adelante-test-app.vercel.app/

As of version 1.1.7 you can:
- Generate inline functions or extract them to their own files
- Generate inline components or extract them to their own files
- Use a combination of the two, e.g inline functions and extracted components
- Generate javascript files
- Define the output path in the adelante.json

It automatically:
- Generates metamask connect fucntionality and component
- Generates a css file
- Generates a html file
- Generates an App.*sx file populated with the generated components

Other functionality:

It logs function calls and the return data from them (if any)

<img width="784" alt="Screenshot 2022-07-18 at 11 37 47" src="https://user-images.githubusercontent.com/67058118/179721242-8eec0615-1b4b-40ee-9e31-101ff4e19f3c.png">
 

Features in development before 1.2.0
- Generate test files for the generated files - in development 
- Make html, index and app file generation optional (components and functions only, formatted for general use)

Planned features: 
- User defined themes

If you like it, send me a coffee :)

<br />

Eth address: 0x4A079D4417b522762C72dB9643234FCC4683a40E

<br />
<br />

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

<br />
<br />

### To install adelante and start generating follow the instructions below:
<br />

You will be asked some questions to configure adelante.json when you use the Setup command.

If you want to use a default configuration and edit the json manually pick 'No' for the first question

<br />
<br />

For yarn users:

<br />

1. Install using:

```
yarn add adelante
```

2. Setup using:

```
yarn adelante --init
```

3. Run using:

```
yarn adelante
```

<br />
<br />

For npm users:

<br />

1. Install using:

```
npm install adelante
```

2. Setup using:

```
npx adelante --init
```

2. Run using:

```
npx adelante
```

<br />
<br />

### it's reccomended that you

- Copy your contracts .json file into the root project directory
- Define the path to your contract.json file in the adelante.json file (if you didnt do it when you generated the adelante file)
- It will genrate without a contract address but one should be addded if you want to it to work properly


```json
{
  "useTypescript": true,
  "inlineFunctions": false,
  "inlineComponents": false,
  "contractPath": "/abi.json", // Path to the compiled contract (found in your artifacts folder if using hardhat, it must be in your project directory)
  "contractAddress": "ENTER_CONTRACT_ADDRESS_HERE",
  "projectPath": "/my-app/src" // Path to app directory, if you want to use create-react-app the path should be to the src file 
}

```



## Generating files

<br />

### Generating functions to interact with the Smart Contract

<br />
<br />

For each callable function on the Smart Contract a function will be generated. Most of these functions will work straight away, payable functions will need to be customised to work correctly.

- With payable functions an ethers.utils.parseEther() is generated in the function file but an amount is not provided

### How come? 
Payable functions dont require the ether amount to de defined as an argument in the function inputs (these are recorded in the contract abi which is the source for the code generation)


The functions will return data if it is expected, otherwise a return statement will not generate.

<br />
<br />

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
### Generating React components to call the functions
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
The example below is from the hosted priview at: https://adelante-test-app.vercel.app/

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


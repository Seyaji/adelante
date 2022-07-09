# Adelante

## what is adelante?
This is a code generation tool to aid in the rapid prototyping of smart contracts built with solidity

if you like it, send me a coffee please! :)

Eth address: 0x4A079D4417b522762C72dB9643234FCC4683a40E
## how can I make it work??
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
npx adelante
```

you will be asked some questions to generate an adelante.json file

As of version 1.1.1 you can:
- generate inline functions or extract them to their own files
- generate inline components or extract them to their own files
- use a combination of the two, e.g inline functions and extracted components
(javascript support and other options coming soon!)

its reccomended that you

to install the dependencies
- copy your abi file into the root project directory
- define the path to your abi file in the adelante.json file (if you didnt do it when you generated the adelante file)
- run npx adelante and it will output the files to a directory named after your contract name
(more output options comming soon)

## Currently it:

### Creates functions to interact with smart contract functions

The functions will return data if it is expected, otherwise it will not generate a return statement.

```js
import { getContract } from '../utils/utils';


export default async function getTotalUnits() {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    const data = await contract.getTotalUnits();
    return data;
  }
  catch (error) {
    console.log(error);
  }
}
```
### Creates React components for the functions
These components have inputs and a button to call the smart contract function along with state and a handleChange function

```jsx

import React, { useState } from 'react';
import purchaseUnit from '../functions/purchaseUnit';

type State = {
  [key: string]: string
}


export default function PurchaseUnit() {
  const [state, setState] = useState<State>({})
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  return (
    <div id="functionBox">
      <div id="heading">
        <h1>purchaseUnit</h1>
        <p>Function inputs: (uint16 _amount: number)</p>
        
        <div id="inputs">
        <input name="_amount" onChange={handleChange} type="number" placeholder="_amount"/>
        </div>

      </div>
      <button onClick={async () => await purchaseUnit(state?._amount)} value="">purchaseUnit</button>
    </div>
  )
}

```
- creates the index.ts, index.html & App files 
- populates the appfile with the components

```jsx
import React from 'react';

import FundWithdraw from './components/fundWithdraw';
import GetInvestor from './components/getInvestor';
import GetRemainingUnits from './components/getRemainingUnits';
import GetTotalUnits from './components/getTotalUnits';
import PurchaseUnit from './components/purchaseUnit';


export default function App() {
  return (
    <div className="home-page">
      <FundWithdraw />
      <GetInvestor />
      <GetRemainingUnits />
      <GetTotalUnits />
      <PurchaseUnit />

    </div>
  )
}
```


Things to note: 

- with payable functions an ethers.utils.parseEther() is generated in the function file but an amount is not provided

how come? 
payable functions dont require the ether amount to de defined as an argument in the function inputs (these are recorded in the contract abi which is the source for the code generation)


# Adelante

### what is adelante?
This is the start of a code generation tool to aid in the rapid prototyping of smart contracts built with solidity

the goal is to turn this into an npm package

### current status =>

Its working, still need to add some boilerplate for metamask connect but it will generate functions and components without errors.

some issues: 

- with payable functions an ethers.utils.parseEther() is generated but an amount is not provided
how come this is an issue? 
payable functions dont require the ether amount to de defined as an argument in the function inputs. this makes it impossible to accurately generate this input from the contract ABI alone which is what is currently being used for generation

solution? 
perhaps some generation from the solidity sourcefile could fix this however it will still not be perfect as there are a wide variety of code styles to account for.



## how can I make it work??

- clone the repo 
- use yarn install to install the dependencies
- copy your abi file into the src directory
- define the path to your abi file in the adelante.json file 
- run yarn start and it will output the files to a directory named after your contract name
export function adelante(useTs: boolean, inlineFunc: boolean, inlineComp: boolean, abiPath: string, contract: string) {
  return `
{
  "useTypescript": ${useTs},
  "inlineFunctions": ${inlineFunc},
  "inlineComponents": ${inlineComp},
  "abiPath": "${abiPath}",
  "contractAddress": "${contract}"
}
`;
}
export function defaultSettings(): string {
  return (
`

{
  "useTypescript": true,
  "inlineFunctions": false,
  "inlineComponents": false,
  "abiPath": "/abi.json",
  "contractAddress": "ENTER_CONTRACT_ADDRESS_HERE"
}

`)
}
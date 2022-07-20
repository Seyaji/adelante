export function adelante(
  useTs: boolean,
  inlineFunc: boolean,
  inlineComp: boolean,
  generateTests: boolean,
  abiPath: string,
  contract: string,
  projectPath: string
) {
  return `
{
  "useTypescript": ${useTs},
  "inlineFunctions": ${inlineFunc},
  "inlineComponents": ${inlineComp},
  "generateTests": ${generateTests},
  "contractPath": "${abiPath}",
  "contractAddress": "${contract}",
  "projectPath": "${projectPath}"
}
`;
}
export function defaultSettings(): string {
  return `
{
  "useTypescript": true,
  "inlineFunctions": false,
  "inlineComponents": false,
  "generateTests": false,
  "contractPath": "/abi.json",
  "contractAddress": "ENTER_CONTRACT_ADDRESS_HERE",
  "projectPath": "ENTER_PROJECT_DIRECTORY_HERE"
}

`;
}

export default function adelante(useTs: boolean, inlineFunc: boolean, inlineComp: boolean, abiPath: string) {
  return `
{
  "useTypescript": ${useTs},
  "inlineFunctions": ${inlineFunc},
  "inlineComponents": ${inlineComp},
  "abiPath": "${abiPath}"
}
`;
}

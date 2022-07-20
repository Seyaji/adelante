import { Input, DataTypes } from '../../types';
import { capitalize } from '../../utils.js'
import { componentImport } from '../utils/imports.js';



const dataTypes: DataTypes = {
  address: 'string',
  bool: 'boolean',
  uint: 'number',
  uint8: 'number',
  uint16: 'number',
  uint32: 'number',
  uint64: 'number',
  uint128: 'number',
  uint256: 'number',
}

const funcFormat = (name: string) => {
  return name.split("").reduce((acc, curr) => {
    if (curr === curr.toUpperCase()) {
      acc += " ";
    }
    acc += curr;
    return acc;
  })
}

function inputTests(name: string, inputs: Input[]) {
  const inputChange = (inputName: string) => {
    return `const ${inputName} = screen.getByRole("spinbutton", {name: "${inputName}"})`
  }
  const changeAwait = (inputName: string, inputType: string) => {
    return `await userEvent.type(${inputName}, ${dataTypes[inputType] === "number" ? `"150"` : `"${inputName}"`}) `
  }
  const changeExpect = (inputName: string, inputType: string) => {
    return `expect(screen.getByRole("spinbutton", {name: "${inputName}"})).toHaveValue(${dataTypes[inputType] === "number" ? "150" : `"${inputName}"`})`
  }
  const inputInDoc = (inputName: string) => {
    return `expect(screen.getByRole("spinbutton", {name: "${inputName}"})).toBeInTheDocument()`
  }
  // ${inputs.map(({ name }) => inputExpect(name)).join("\n")}
  return {
    inDoc: 
`  ${inputs.map(({ name }) => inputInDoc(name)).join("\n    ")}`,
    change: 
`
    ${inputs.map(({ name }) => inputChange(name)).join("\n    ")}
    ${inputs.map(({ name, type }) => changeAwait(name, type)).join("\n    ")}
    ${inputs.map(({ name, type }) => changeExpect(name, type)).join("\n    ")}`,
    length:
`  expect(screen.getAllByRole("spinbutton").length).toBe(${inputs.length});`};
}

export default function ComponentTestTemplate(name: string, inputs: Input[], outputs: any[], stateMutability: any, inlineComponents: boolean) {
  return {
    file: `
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

${componentImport(name, "../../components/", inlineComponents)}

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

const setup = (propOverrides?: Partial<Props>) => {
  const props: Props = {
    handleMasterLogsChange: jest.fn(),
    ...propOverrides,
  }
  return render(<${capitalize(name)} { ...props} />);
}

describe('Test for ${name} component', () => {
  it('should render without exploding, () => {}', () => {
    expect(() => setup()).not.toThrow();
  })
${ inputs.length > 0 ? 
`  it('should render ${capitalize(name)} inputs', () => {
    setup();
  ${inputs.length > 0 ? inputTests(name, inputs).length : ""}
  ${inputs.length > 0 ? inputTests(name, inputs).inDoc : ""}
  })
` : ""}

  it('should render the button to call the contract function', () => {
    setup();
    expect(screen.getByRole("button", { name: "${name}" })).toBeInTheDocument()
  })

  it('should render the component heading correctly', () => {
    setup();
    expect(screen.getByRole("heading", { name: "${funcFormat(capitalize(name))}" })).toBeInTheDocument()
  })

  it('should call handleMasterLogsChange on button click', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    const handleMock = jest.fn();
    setup({ handleMasterLogsChange: handleMock });

    const button = screen.getByRole("button", { name: "${name}" });
    await userEvent.click(button);

    expect(handleMock).toHaveBeenCalled();
    expect(consoleSpy.mock.calls.length).toBe(1);
  })
${ inputs.length > 0 ? 
  `
  it('should handle input change correctly', async () => {
    setup();
    ${inputs.length > 0 ? inputTests(name, inputs).change : ""}
  })
  ` : ""}
})
`,
  };
}

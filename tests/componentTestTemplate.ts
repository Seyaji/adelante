function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
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

function inputTests(name: string, inputs: any[]) {
  const inputExpect = (inputName: string) => `expect(screen.getByRole("input", {name: "${inputName}"})).toBeInTheDocument()`;
  // ${inputs.map(({ name }) => inputExpect(name)).join("\n")}
  return `
  it('should render ${capitalize(name)} input', () => {
    setup();
    expect(screen.getAllByRole("spinbutton").length).toBe(${inputs.length});
  })
`;
}

export default function ComponentTestTemplate(name: string, inputs: any[], outputs: any[], stateMutability: any) {
  return {
    file: `
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ${capitalize(name)} from "../../test-app/components/${capitalize(name)}";

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
  ${inputs.length > 0 ? inputTests(name, inputs) : ""}

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
})
`,
  };
}

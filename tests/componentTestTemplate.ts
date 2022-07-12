

function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function ComponentTestTemplate(name: string, inputs: any, outputs: any, stateMutability: any) {
  return {
    file:
`
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ${capitalize(name)} from "../../test-app/components/${capitalize(name)}";

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

const setup = () => {
  const props = {
    handleMasterLogsChange: jest.fn(),
  }
  return render(<${capitalize(name)} { ...props} />);
}

describe('Test for ${name} component', () => {
  it('should render without exploding, () => {}', () => {
    expect(() => setup()).not.toThrow();
  })
})
`
  }
}
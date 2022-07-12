
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Hello from "../../test-app/components/Hello";

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

const setup = () => {
  const props = {
    handleMasterLogsChange: jest.fn(),
  }
  return render(<Hello { ...props} />);
}

describe('Test for hello component', () => {
  it('should render without exploding, () => {}', () => {
    expect(() => setup()).not.toThrow();
  })
})

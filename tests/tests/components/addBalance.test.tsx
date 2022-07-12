
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import AddBalance from "../../test-app/components/AddBalance";

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

const setup = () => {
  const props = {
    handleMasterLogsChange: jest.fn(),
  }
  return render(<AddBalance { ...props} />);
}

describe('Test for addBalance component', () => {
  it('should render without exploding, () => {}', () => {
    expect(() => setup()).not.toThrow();
  })
})

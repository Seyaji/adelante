
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ReturnSum from "../../test-app/components/ReturnSum";

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

const setup = () => {
  const props = {
    handleMasterLogsChange: jest.fn(),
  }
  return render(<ReturnSum { ...props} />);
}

describe('Test for returnSum component', () => {
  it('should render without exploding, () => {}', () => {
    expect(() => setup()).not.toThrow();
  })
})

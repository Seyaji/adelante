
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import GetNumber from "../../test-app/components/GetNumber";

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

const setup = () => {
  const props = {
    handleMasterLogsChange: jest.fn(),
  }
  return render(<GetNumber { ...props} />);
}

describe('Test for getNumber component', () => {
  it('should render without exploding, () => {}', () => {
    expect(() => setup()).not.toThrow();
  })
})

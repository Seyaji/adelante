
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import StoreNumber from "../../test-app/components/StoreNumber";

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

const setup = () => {
  const props = {
    handleMasterLogsChange: jest.fn(),
  }
  return render(<StoreNumber { ...props} />);
}

describe('Test for storeNumber component', () => {
  it('should render without exploding, () => {}', () => {
    expect(() => setup()).not.toThrow();
  })
})


import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Hello from "../../test-app/components/Hello";

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

const setup = (propOverrides?: Partial<Props>) => {
  const props: Props = {
    handleMasterLogsChange: jest.fn(),
    ...propOverrides,
  }
  return render(<Hello { ...props} />);
}

describe('Test for hello component', () => {
  it('should render without exploding, () => {}', () => {
    expect(() => setup()).not.toThrow();
  })


  it('should render the button to call the contract function', () => {
    setup();
    expect(screen.getByRole("button", { name: "hello" })).toBeInTheDocument()
  })

  it('should render the component heading correctly', () => {
    setup();
    expect(screen.getByRole("heading", { name: "Hello" })).toBeInTheDocument()
  })

  it('should call handleMasterLogsChange on button click', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    const handleMock = jest.fn();
    setup({ handleMasterLogsChange: handleMock });

    const button = screen.getByRole("button", { name: "hello" });
    await userEvent.click(button);

    expect(handleMock).toHaveBeenCalled();
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

})


import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import WithdrawBalance from "../../test-app/components/WithdrawBalance";

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

const setup = (propOverrides?: Partial<Props>) => {
  const props: Props = {
    handleMasterLogsChange: jest.fn(),
    ...propOverrides,
  }
  return render(<WithdrawBalance { ...props} />);
}

describe('Test for withdrawBalance component', () => {
  it('should render without exploding, () => {}', () => {
    expect(() => setup()).not.toThrow();
  })
  it('should render WithdrawBalance inputs', () => {
    setup();
    expect(screen.getAllByRole("spinbutton").length).toBe(1);
    expect(screen.getByRole("spinbutton", {name: "amount"})).toBeInTheDocument()
  })


  it('should render the button to call the contract function', () => {
    setup();
    expect(screen.getByRole("button", { name: "withdrawBalance" })).toBeInTheDocument()
  })

  it('should render the component heading correctly', () => {
    setup();
    expect(screen.getByRole("heading", { name: "Withdraw Balance" })).toBeInTheDocument()
  })

  it('should call handleMasterLogsChange on button click', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    const handleMock = jest.fn();
    setup({ handleMasterLogsChange: handleMock });

    const button = screen.getByRole("button", { name: "withdrawBalance" });
    await userEvent.click(button);

    expect(handleMock).toHaveBeenCalled();
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

  it('should handle input change correctly', async () => {
    setup();
    
    const amount = screen.getByRole("spinbutton", {name: "amount"})
    await userEvent.type(amount, "150") 
    expect(screen.getByRole("spinbutton", {name: "amount"})).toHaveValue(150)
  })
  
})

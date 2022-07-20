
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import StoreNumber from "../../test-app/components/StoreNumber";

type Props = {
  handleMasterLogsChange: (data: any) => void;
};

const setup = (propOverrides?: Partial<Props>) => {
  const props: Props = {
    handleMasterLogsChange: jest.fn(),
    ...propOverrides,
  }
  return render(<StoreNumber { ...props} />);
}

describe('Test for storeNumber component', () => {
  it('should render without exploding, () => {}', () => {
    expect(() => setup()).not.toThrow();
  })
  it('should render StoreNumber inputs', () => {
    setup();
    expect(screen.getAllByRole("spinbutton").length).toBe(1);
    expect(screen.getByRole("spinbutton", {name: "_number"})).toBeInTheDocument()
  })


  it('should render the button to call the contract function', () => {
    setup();
    expect(screen.getByRole("button", { name: "storeNumber" })).toBeInTheDocument()
  })

  it('should render the component heading correctly', () => {
    setup();
    expect(screen.getByRole("heading", { name: "Store Number" })).toBeInTheDocument()
  })

  it('should call handleMasterLogsChange on button click', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    const handleMock = jest.fn();
    setup({ handleMasterLogsChange: handleMock });

    const button = screen.getByRole("button", { name: "storeNumber" });
    await userEvent.click(button);

    expect(handleMock).toHaveBeenCalled();
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

  it('should handle input change correctly', async () => {
    setup();
    
    const _number = screen.getByRole("spinbutton", {name: "_number"})
    await userEvent.type(_number, "150") 
    expect(screen.getByRole("spinbutton", {name: "_number"})).toHaveValue(150)
  })
  
})

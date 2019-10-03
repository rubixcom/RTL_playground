import React from 'react';
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calculator from '../Calculator';

afterEach(cleanup);

it("matches snapshot", () => {
  const { asFragment } = render(<Calculator />);
  expect(asFragment()).toMatchSnapshot();
});

it('displays 0 when first initialised', () => {
    const { getByTestId } = render(<Calculator />);
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.textContent).toBe('0');  
});

it('supports basic entry of values', () => {
    const { getByTestId, getByText } = render(<Calculator />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('.'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('3'));
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.textContent).toBe('1.23');  
});

it('doesn\'t accept invalid numbers', () => {
    const { getByTestId, getByText } = render(<Calculator />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('.'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('.'));
    fireEvent.click(getByText('3'));
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.textContent).toBe('1.23');  
});

it('does not display leading 0', () => {
    const { getByTestId, getByText } = render(<Calculator />);
    fireEvent.click(getByText('.'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('3'));
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.textContent).toBe('0.23');  
});

it('doesn\'t allow allow multiple 0s', () => {
    const { getByTestId } = render(<Calculator />);
    fireEvent.click(getByTestId('0'));
    fireEvent.click(getByTestId('0'));
    fireEvent.click(getByTestId('3'));
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.textContent).toBe('3');  
});

it('does addition', () => {
    const { getByTestId } = render(<Calculator />);
    const displayPanel = getByTestId('DisplayPanel');
    fireEvent.click(getByTestId('2'));
    expect(displayPanel.textContent).toBe('2');  
    fireEvent.click(getByTestId('+'));
    fireEvent.click(getByTestId('2'));
    expect(displayPanel.textContent).toBe('2');  
    fireEvent.click(getByTestId('='));
    expect(displayPanel.textContent).toBe('4');  
});

it('it does repeat operations', () => {
    const { getByTestId } = render(<Calculator />);
    fireEvent.click(getByTestId('2'));
    fireEvent.click(getByTestId('*'));
    fireEvent.click(getByTestId('2'));
    fireEvent.click(getByTestId('='));
    fireEvent.click(getByTestId('='));
    fireEvent.click(getByTestId('='));
    fireEvent.click(getByTestId('='));
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.textContent).toBe('32');  
});

it('does long series or operations', () => {
    const { getByTestId } = render(<Calculator />);
    const displayPanel = getByTestId('DisplayPanel');
    fireEvent.click(getByTestId('9'));
    fireEvent.click(getByTestId('8'));
    fireEvent.click(getByTestId('7'));
    expect(displayPanel.textContent).toBe('987');  
    fireEvent.click(getByTestId('/'));
    fireEvent.click(getByTestId('4'));
    expect(displayPanel.textContent).toBe('4');  
    fireEvent.click(getByTestId('*'));
    fireEvent.click(getByTestId('5'));
    fireEvent.click(getByTestId('6'));
    fireEvent.click(getByTestId('-'));
    fireEvent.click(getByTestId('1'));
    fireEvent.click(getByTestId('2'));
    fireEvent.click(getByTestId('3'));
    fireEvent.click(getByTestId('4'));
    expect(displayPanel.textContent).toBe('1234');  
    fireEvent.click(getByTestId('='));
    expect(displayPanel.textContent).toBe('-1178');  
    fireEvent.click(getByTestId('C'));
    expect(displayPanel.textContent).toBe('0');  
    fireEvent.click(getByTestId('1'));
    fireEvent.click(getByTestId('2'));
    fireEvent.click(getByTestId('3'));
    expect(displayPanel.textContent).toBe('123');  
    fireEvent.click(getByTestId('='));
    expect(displayPanel.textContent).toBe('0');  
});
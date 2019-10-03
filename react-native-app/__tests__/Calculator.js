import 'react-native';
import React from 'react';
import Calculator from '../Calculator';

import  { render, fireEvent } from 'react-native-testing-library';


it('renders correctly', () => {
  render(<Calculator />);
});

it('displays 0 when first initialised', () => {
    const { getByTestId } = render(<Calculator />);
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.props.children).toBe('0');  
});

it('supports basic entry of values', () => {
    const { getByTestId, getByText } = render(<Calculator />);
    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('3'));
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.props.children).toBe('1.23');  
});

it('doesn\'t accept invalid numbers', () => {
    const { getByTestId, getByText } = render(<Calculator />);
    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('3'));
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.props.children).toBe('1.23');  
});

it('does not display leading 0', () => {
    const { getByTestId, getByText } = render(<Calculator />);
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('3'));
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.props.children).toBe('0.23');  
});

it('doesn\'t allow allow multiple 0s', () => {
    const { getByTestId } = render(<Calculator />);
    fireEvent.press(getByTestId('0'));
    fireEvent.press(getByTestId('0'));
    fireEvent.press(getByTestId('3'));
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.props.children).toBe('3');  
});

it('does addition', () => {
    const { getByTestId } = render(<Calculator />);
    const displayPanel = getByTestId('DisplayPanel');
    fireEvent.press(getByTestId('2'));
    expect(displayPanel.props.children).toBe('2');  
    fireEvent.press(getByTestId('+'));
    fireEvent.press(getByTestId('2'));
    expect(displayPanel.props.children).toBe('2');  
    fireEvent.press(getByTestId('='));
    expect(displayPanel.props.children).toBe('4');  
});

it('it does repeat operations', () => {
    const { getByTestId } = render(<Calculator />);
    fireEvent.press(getByTestId('2'));
    fireEvent.press(getByTestId('*'));
    fireEvent.press(getByTestId('2'));
    fireEvent.press(getByTestId('='));
    fireEvent.press(getByTestId('='));
    fireEvent.press(getByTestId('='));
    fireEvent.press(getByTestId('='));
    const displayPanel = getByTestId('DisplayPanel');
    expect(displayPanel.props.children).toBe('32');  
});

it('does long series or operations', () => {
    const { getByTestId } = render(<Calculator />);
    const displayPanel = getByTestId('DisplayPanel');
    fireEvent.press(getByTestId('9'));
    fireEvent.press(getByTestId('8'));
    fireEvent.press(getByTestId('7'));
    expect(displayPanel.props.children).toBe('987');  
    fireEvent.press(getByTestId('/'));
    fireEvent.press(getByTestId('4'));
    expect(displayPanel.props.children).toBe('4');  
    fireEvent.press(getByTestId('*'));
    fireEvent.press(getByTestId('5'));
    fireEvent.press(getByTestId('6'));
    fireEvent.press(getByTestId('-'));
    fireEvent.press(getByTestId('1'));
    fireEvent.press(getByTestId('2'));
    fireEvent.press(getByTestId('3'));
    fireEvent.press(getByTestId('4'));
    expect(displayPanel.props.children).toBe('1234');  
    fireEvent.press(getByTestId('='));
    expect(displayPanel.props.children).toBe('-1178');  
    fireEvent.press(getByTestId('C'));
    expect(displayPanel.props.children).toBe('0');  
    fireEvent.press(getByTestId('1'));
    fireEvent.press(getByTestId('2'));
    fireEvent.press(getByTestId('3'));
    expect(displayPanel.props.children).toBe('123');  
    fireEvent.press(getByTestId('='));
    expect(displayPanel.props.children).toBe('0');  
});
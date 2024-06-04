import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CalculatorPage from './CalculatorPage';

describe('CalculatorPage', () => {
  test('renders calculator with initial state', () => {
    const {getByPlaceholderText, getByTestId} = render(<CalculatorPage />);

    expect(getByPlaceholderText('0')).toBeTruthy();
    expect(getByTestId('button-0')).toBeTruthy();
    expect(getByTestId('button-1')).toBeTruthy();
    expect(getByTestId('button-2')).toBeTruthy();
    expect(getByTestId('button-3')).toBeTruthy();
    expect(getByTestId('button-4')).toBeTruthy();
    expect(getByTestId('button-5')).toBeTruthy();
    expect(getByTestId('button-6')).toBeTruthy();
    expect(getByTestId('button-7')).toBeTruthy();
    expect(getByTestId('button-8')).toBeTruthy();
    expect(getByTestId('button-9')).toBeTruthy();
    expect(getByTestId('button-plus')).toBeTruthy();
    expect(getByTestId('button-minus')).toBeTruthy();
    expect(getByTestId('button-multiply')).toBeTruthy();
    expect(getByTestId('button-divide')).toBeTruthy();
    expect(getByTestId('button-equal')).toBeTruthy();
    expect(getByTestId('button-dot')).toBeTruthy();
    expect(getByTestId('button-clear')).toBeTruthy();
    expect(getByTestId('button-percentage')).toBeTruthy();
    expect(getByTestId('button-sign')).toBeTruthy();
  });

  test('handles button press correctly', () => {
    const {getByTestId, getByPlaceholderText} = render(<CalculatorPage />);

    fireEvent.press(getByTestId('button-1'));
    fireEvent.press(getByTestId('button-plus'));
    fireEvent.press(getByTestId('button-2'));
    fireEvent.press(getByTestId('button-equal'));

    expect(getByPlaceholderText('0').props.value).toBe('3');
  });

  test('handles clear button press correctly', () => {
    const {getByTestId, getByPlaceholderText} = render(<CalculatorPage />);

    fireEvent.press(getByTestId('button-1'));
    fireEvent.press(getByTestId('button-plus'));
    fireEvent.press(getByTestId('button-2'));
    fireEvent.press(getByTestId('button-clear'));

    expect(getByPlaceholderText('0').props.value).toBe('');
  });

  test('handles percentage button press correctly', () => {
    const {getByTestId, getByPlaceholderText} = render(<CalculatorPage />);

    fireEvent.press(getByTestId('button-2'));
    fireEvent.press(getByTestId('button-percentage'));

    expect(getByPlaceholderText('0').props.value).toBe('0.02');
  });

  test('test multipy button', () => {
    const {getByTestId, getByPlaceholderText} = render(<CalculatorPage />);

    fireEvent.press(getByTestId('button-8'));
    fireEvent.press(getByTestId('button-multiply'));
    fireEvent.press(getByTestId('button-5'));
    fireEvent.press(getByTestId('button-equal'));

    expect(getByPlaceholderText('0').props.value).toBe('40');
  });

  test('tests devide button ', () => {
    const {getByTestId, getByPlaceholderText} = render(<CalculatorPage />);

    fireEvent.press(getByTestId('button-9'));
    fireEvent.press(getByTestId('button-divide'));
    fireEvent.press(getByTestId('button-3'));
    fireEvent.press(getByTestId('button-equal'));

    expect(getByPlaceholderText('0').props.value).toBe('3');
  });

  test('handles +/- button press correctly', () => {
    const {getByTestId, getByPlaceholderText} = render(<CalculatorPage />);

    fireEvent.press(getByTestId('button-0'));
    fireEvent.press(getByTestId('button-plus'));
    fireEvent.press(getByTestId('button-4'));
    fireEvent.press(getByTestId('button-multiply'));
    fireEvent.press(getByTestId('button-6'));
    fireEvent.press(getByTestId('button-minus'));
    fireEvent.press(getByTestId('button-7'));
    fireEvent.press(getByTestId('button-equal'));

    expect(getByPlaceholderText('0').props.value).toBe('17');
  });

  test('tests dot operator', () => {
    const {getByTestId, getByPlaceholderText} = render(<CalculatorPage />);

    fireEvent.press(getByTestId('button-4'));
    fireEvent.press(getByTestId('button-dot'));
    fireEvent.press(getByTestId('button-8'));
    fireEvent.press(getByTestId('button-plus'));
    fireEvent.press(getByTestId('button-2'));
    fireEvent.press(getByTestId('button-equal'));

    expect(getByPlaceholderText('0').props.value).toBe('6.8');
  });
});

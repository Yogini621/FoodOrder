import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import UserPage from './UserPage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('UserPage', () => {
  test('renders UserPage correctly', () => {
    const {getByText} = render(
      <UserPage navigation={mockNavigation} />
    );

    const headerText = getByText('Menu');
    expect(headerText).toBeTruthy();
    const test = getByText('Find The Best Food Around You');
    expect(test).toBeTruthy();
  });

  test('navigates to CartPage on shopping bag press', () => {
    const navigateMock = jest.fn();
    const {getByTestId} = render(<UserPage navigation={mockNavigation} />);

    fireEvent.press(getByTestId('cartButton'));
    expect(navigateMock).toHaveBeenCalledWith('CartPage');
  });



  function add(a: number, b: number) {
    return a + b;
  }
  var c = add(2, 3);
  console.log(c);

  function ad(a: number) {
    return function (b: number) {
      return function (c: number) {
        return a + b + c;
      };
    };
  }
  var d = ad(1)(2)(4);
  console.log(d);

  function sub(a:number){
    return function(b:number){
      return function(c:number){
        return a-b-c
      }
    }
  }
  var e = sub(1)(2)(3)
  console.log(e)

function mul(a:number){
  return function(b:number){
    return function(c:number){
      return a*b*c
    }
  }
}
var f = mul(1)(2)(3)
console.log(f)

});

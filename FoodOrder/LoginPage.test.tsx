// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LoginPage, {Credentials} from './LoginPage';
// import {fireEvent, render} from '@testing-library/react-native';

// jest.mock('@react-native-async-storage/async-storage', () => {
//   return {
//     AsyncStorage: jest.fn(),
//   };
// });

// describe('LoginPage Component', () => {
//   test('renders correctly', () => {
//     const {getByText} = render(<LoginPage navigation={undefined} />);
//     const headerText = getByText('User');
//     expect(headerText).toBeTruthy();

//     const headerText1 = getByText('Admin');
//     expect(headerText1).toBeTruthy();

//     const btnElement = getByText('Login');
//     expect(btnElement).toBeTruthy();
//   });

//   const adminData: Credentials = {
//     email: 'abc123@gmail.com',
//     password: 'abc',
//   };

//   test('calls login button when admin login', () => {
//     const {getByText} = render(<LoginPage navigation={undefined} />);

//     const btnElement = getByText('Admin');
//     expect(btnElement).toBeTruthy();

//     const btnElement1 = getByText('Login');
//     fireEvent.press(btnElement1);
//     expect(adminData).toBeTruthy();
//   });

//   const userData: Credentials = {
//     email: 'user123@gmail.com',
//     password: '123',
//   };

//   test('calls login button when user login',async () => {
//     const {getByText} = render(<LoginPage navigation={undefined} />);

//     const btnElement = getByText('User');
//     expect(btnElement).toBeTruthy();

//     await AsyncStorage.setItem('userData', JSON.stringify(userData));

//     const btnElement1 = getByText('Login');
//     const details = await AsyncStorage.getItem("userData")
//     fireEvent.press(btnElement1);
//     expect(details).toEqual(userData)

//   });
// });

import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LoginPage from './LoginPage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe('LoginPage', () => {
  test('toggles between admin and user mode', () => {
    const {getByText} = render(<LoginPage navigation={mockNavigation} />);
    const adminButton = getByText('Admin');
    const userButton = getByText('User');
    fireEvent.press(adminButton);
    expect(adminButton.props.style).toContainEqual({backgroundColor: 'green'});
    expect(userButton.props.style).toContainEqual({
      backgroundColor: 'white',
    });
    fireEvent.press(userButton);
    expect(adminButton.props.style).not.toContainEqual({
      backgroundColor: 'green',
    });

    expect(userButton.props.style).toContainEqual({backgroundColor: 'green'});
  });
  test('handles login with correct credentials', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginPage navigation={mockNavigation} />,
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
    fireEvent.changeText(emailInput, 'admin123@gmail.com');
    fireEvent.changeText(passwordInput, '12345');
    fireEvent.press(loginButton);
    // Wait for AsyncStorage.setItem to be called
    await waitFor(() => expect(loginButton).toHaveBeenCalled());
    // Expect navigation to AdminPage
    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'AdminPage',
      expect.any(Object),
    );
  });
  test('handles login with incorrect credentials', async () => {
    const {getByPlaceholderText, getByText} = render(
      <LoginPage navigation={mockNavigation} />,
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
    fireEvent.changeText(emailInput, 'incorrect@gmail.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(loginButton);
    // Wait for Alert to be shown
    await waitFor(() =>
      expect(getByText('Incorrect Credentials')).toBeTruthy(),
    );
    // Expect navigation not to be called
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });
});

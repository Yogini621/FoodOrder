/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native'

jest.mock('@react-navigation/native-stack',() => {
  return {
    createNativeStackNavigator:jest.fn()
  };
});

jest.mock('@react-native-async-storage/async-storage',() => {
  return {
    AsyncStorage : jest.fn()
  };
});

jest.mock('react-native-vector-icons/AntDesign',() => "Icon");

it('renders correctly', () => {
  render(<App />);
});

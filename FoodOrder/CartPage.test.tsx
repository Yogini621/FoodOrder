import CartPage, {Props} from './CartPage';
import {render} from '@testing-library/react-native';

const mockedNavigation: Props = {
  navigation: jest.fn(),
  route: jest.fn(),
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('CartPage Component ', () => {
  test('renders correctly in cartPage', () => {
    const {getByText} = render(<CartPage {...mockedNavigation} />);

    const headerText = getByText('Cart');
    expect(headerText).toBeTruthy();
  });
});

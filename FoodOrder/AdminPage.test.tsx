import AdminPage from "./AdminPage";
import {render} from '@testing-library/react-native'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');


describe("AdminPage Component" ,() => {
    test("renders Correctly in Admin Page" , () => {
        const {getByText} = render(<AdminPage navigation={mockNavigation} />)
        const headerText = getByText("Admin")
        expect(headerText).toBeTruthy()
    })
})





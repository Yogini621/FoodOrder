import { Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import React,{Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface State {
  email: string;
  password: string;
  isAdmin: boolean;
  credentials: Credentials[];
}
interface Props {
  navigation: any;
}

export interface Credentials {
  email: string;
  password: string;
}

export default class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAdmin: true,
      credentials: [],
    };
  }

  adminData = {
    email: 'admin123@gmail.com',
    password: '12345',
  };

  userData = {
    email: 'user123@gmail.com',
    password: '12344',
  };

  toogleLogin = (isAdmin: boolean) => {
    this.setState({isAdmin});
  };

  handleLogin = async () => {
    const {email, password, isAdmin} = this.state;
    try {
      await AsyncStorage.setItem('adminData', JSON.stringify(this.adminData));

      let credentialsString = await AsyncStorage.getItem('adminData');
      if (credentialsString !== null) {
        let credentials = JSON.parse(credentialsString);
        this.setState({credentials: credentials});
      }
      if (isAdmin) {
        if (email === this.adminData.email && password === this.adminData.password) {
          this.setState({email: '', password: ''});
          this.props.navigation.navigate('AdminPage',{data: this.adminData});
        } else {
          Alert.alert('Incorrect Credentials');
        } 
      } else {
        if (email === this.userData.email && password === this.userData.password) {
          this.props.navigation.navigate('UserPage');
          this.setState({email:'',password:''});
        } else {
          Alert.alert('Incorrect Credentials');
        }
      }
    } catch (error) {
      console.log('error occured', error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={[
              styles.button,
              this.state.isAdmin ? styles.activeButton : null,
            ]}
            onPress={() => this.toogleLogin(true)}>
            <Text
              style={[
                styles.adminText,
                this.state.isAdmin ? styles.activeText : null,
              ]}>
              Admin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              !this.state.isAdmin ? styles.activeButton : null,
            ]}
            onPress={() => this.toogleLogin(false)}>
            <Text
              style={[
                styles.adminText,
                !this.state.isAdmin ? styles.activeText : null,
              ]}>
              User
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image source={require('../Images/food.png')} style={styles.image} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            onChangeText={email => this.setState({email})}
            placeholderTextColor="#202c8a"
            style={styles.input}
            value={this.state.email}
          />
          <TextInput
            placeholder="Password"
            onChangeText={password => this.setState({password})}
            placeholderTextColor="#202c8a"
            style={styles.input}
            value={this.state.password}
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.handleLogin()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: responsiveWidth(4),
    marginTop: '20%',
  },
  button: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#2075ba',
  },
  inputView: {
    alignItems: 'center',
    marginTop: '10%',
  },
  input: {
    height: 40,
    width: '60%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 4,
    backgroundColor: '#cae0e3',
    borderColor: '#454b7d',
  },
  loginButton: {
    padding: 10,
    width: '40%',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: '20%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#464e85',
  },
  buttonText: {
    color: 'white',
  },
  orLoginView: {
    marginTop: '4%',
    alignItems: 'center',
  },
  adminText: {
    color: 'white',
  },
  image: {
    height: responsiveHeight(30),
    width: responsiveWidth(60),
    alignItems: 'center',
    alignSelf: 'center',
  },
  activeText: {
    color: 'white',
  },
  activeButton: {
    backgroundColor: 'green',
  },
});

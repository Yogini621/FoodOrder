import {Text,StyleSheet,View,FlatList,TouchableOpacity,Image,SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export interface Props {
  navigation: any;
  route: any;
}

interface State {
  items: Item[];
  cart: Item[];
}
interface Item {
  quantity: number;
  name: string;
  price: number;
  id: number;
}

export default class CartPage extends Component<Props,State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      items: [],
      cart: [],
    };
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async () => {
    const itemsData = await AsyncStorage.getItem('cart');
    if (itemsData !== null) {
      let cart: Item[] = JSON.parse(itemsData);
      cart = cart.map(item => ({
        ...item,
        quantity: item.quantity ? item.quantity : 1,
      }));
      this.setState({cart: cart});
    }
  };

  renderItems = ({item}: {item: Item}) => {
    return (
      <View style={styles.cartList}>
        <Image
          source={require('../Images/Rectangle.png')}
          style={styles.image}
        />
        <View>
          <Text style={styles.items}> {item.name} </Text>
          <Text style={[styles.items,{marginTop:'40%',color:'red',marginLeft:'6%'}]}> {item.price} </Text>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => this.handleDecrement(item)}>
            <Text style={styles.items}>-</Text>
          </TouchableOpacity>
          <Text style={styles.items}> {item.quantity} </Text>

          <TouchableOpacity onPress={() => this.handleIncrement(item)}>
            <Text style={styles.items}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  handleIncrement = (item: Item) => {
    const {cart} = this.state;
    const updatedCart = cart.map(cartItem =>
      cartItem.name === item.name
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem,
    );
    this.setState({cart: updatedCart});
    this.saveItems(updatedCart);
  };

  handleDecrement = (item: Item) => {
    const {cart} = this.state;
    const updatedCart = cart
      .map(cartItem =>
        cartItem.name === item.name
          ? {...cartItem, quantity: cartItem.quantity - 1}
          : cartItem,
      )
      .filter(cartItem => cartItem.quantity > 0);
    this.setState({cart: updatedCart});
    this.saveItems(updatedCart);
  };

  calculateTotal = () => {
    return this.state.cart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
  };

  saveItems = async (cart: Item[]) => {
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  };

  goBackPage = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cartView}>
          <TouchableOpacity onPress={this.goBackPage}>
            <Image source={require('../Images/left-arrow.png')} />
          </TouchableOpacity>
          <Text style={styles.cartText}>Cart</Text>
        </View>
          <FlatList data={this.state.cart} 
          renderItem={this.renderItems} 
          contentContainerStyle = {styles.flatlistContainer}
          />
        <View style={styles.totalView}>
          <Text style={styles.items}>Total : </Text>
          <Text style={styles.items}>{this.calculateTotal()}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cartList: {
    height: 'auto',
    width: '80%',
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: '2%',
    padding: 6,
  },
  cartView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: responsiveWidth(6),
    marginTop: responsiveHeight(2),
    marginBottom: '6%',
  },
  cartText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '30%',
    color: 'black',
  },
  totalView: {
    alignItems: 'flex-end',
    marginHorizontal: responsiveWidth(4),
    height: 60,
    bottom: 200,
  },
  items: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: '40%',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignSelf: 'center',
  },
  flatlistContainer:{
    flex :1,
  }
});

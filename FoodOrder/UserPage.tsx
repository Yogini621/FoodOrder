import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ImageSourcePropType} from 'react-native';
import Items from './Items';

interface State {
  items: Item[];
  cart: Item[];
}

interface Item {
  id: number;
  quantity: number;
  name: string;
  price: number;
  image: ImageSourcePropType;
  count: number;
}

interface Props {
  navigation: any;
}

export default class UserPage extends Component<Props, State> {
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
    const itemsData = await AsyncStorage.getItem('items');
    if (itemsData) {
      const items = JSON.parse(itemsData);
      this.setState({items});
    }
  };

  handleAddToCart = async (newItem: Item) => {
    let cartItemsString = await AsyncStorage.getItem('cart');
    let cart: Item[] = this.state.cart;

    if (cartItemsString !== null) {
      cart = JSON.parse(cartItemsString);
    }
    const isInCart = cart.some(item => item.name === newItem.name);

    if (isInCart) {
      Alert.alert('This Item already in Cart');
      return [];
    }
    cart.push(newItem);
    const updateCart = [...cart, newItem];
    this.setState({cart: updateCart});
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    console.log(this.state.cart.length - 1);
  };

  renderItems = ({item}: {item: Item}) => {
    return (
      <View style={styles.itemsView}>
        <Image
          source={require('../Images/Rectangle.png')}
          style={styles.image1}
        />
        <Text style={styles.itemNameText}>{item.name}</Text>
        <View style={styles.priceView}>
          <Text style={styles.items}>$ {item.price}</Text>
          <TouchableOpacity
            onPress={() => this.handleAddToCart(item)}
            style={styles.addButton}>
            <Image source={require('../Images/add.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  goBackPage = () => {
    this.props.navigation.goBack();
  };

  gotoCartPage = () => {
    this.props.navigation.navigate('CartPage');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userView}>
          <TouchableOpacity onPress={this.goBackPage}>
            <Image source={require('../Images/left-arrow.png')} />
          </TouchableOpacity>
          <Text style={styles.userText}>Menu</Text>
          <Text style={styles.countText}> {this.state.cart.length - 1} </Text>

          <TouchableOpacity onPress={this.gotoCartPage}>
            <Image
              source={require('../Images/shopping-bag.png')}
              style={styles.image}
            />
            <Text testID="cartButton">CartPage</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.findVoew}>
          <Text style={styles.findText}>
            Find The <Text style={styles.best}>Best Food </Text>
            <Text style={styles.findText}>Around You</Text>
          </Text>
        </View>
        <Items title="Hello" color="blue" />

        <FlatList
          data={this.state.items}
          renderItem={this.renderItems}
          keyExtractor={item => item.name}
          numColumns={2}
          ListEmptyComponent={<Text> No Items</Text>}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemsView: {
    marginTop: '2%',
    marginHorizontal: '4%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 5,
    width: '40%',
    height: 'auto',
  },
  itemList: {},

  userView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '6%',
    marginTop: '6%',
  },
  userText: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },
  items: {
    fontSize: 16,
    fontWeight: '600',
    color: 'red',
  },
  countText: {
    color: 'red',
    left: 90,
    marginBottom: '6%',
  },
  image: {},
  image1: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: '6%',
  },

  itemNameText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
  },
  addText: {
    color: 'black',
    fontSize: 16,
  },
  findText: {
    fontSize: 28,
    color: 'black',
  },
  findVoew: {
    marginLeft: '4%',
    margin: '4%',
    width: 220,
  },
  best: {
    fontWeight: 'bold',
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '4%',
  },
});

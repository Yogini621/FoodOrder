import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  navigation: any;
}

interface State {
  modalVisible: boolean;
  items: Item[];
  newItemName: string;
  newItemPrice: string;
}

interface Item {
  id: number;
  name: string;
  price: number;
}

export default class AdminPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      items: [],
      newItemName: '',
      newItemPrice: '',
    };
  }

  imageData = {
    image: 'pngwing2.ong',
  };

  componentDidMount() {
    this.loadAddItems();
  }

  loadAddItems = async () => {
    const itemsData = await AsyncStorage.getItem('items');
    let items: Item[] = this.state.items;
    if (itemsData !== null) {
      items = JSON.parse(itemsData);
      this.setState({items: items});
    }
  };

  addItem = async () => {
    const {items, newItemName, newItemPrice} = this.state;

    const newItem = {
      id: Date.now(),
      name: newItemName,
      price: Number(newItemPrice),
    };
    const upDatedItems = [...items, newItem];
    this.setState({
      items: upDatedItems,
      newItemName: '',
      newItemPrice: '',
      modalVisible: false,
    });
    await AsyncStorage.setItem('items', JSON.stringify(items));

    this.saveItems(upDatedItems);
  };

  saveItems = async (items: Item[]) => {
    await AsyncStorage.setItem('items', JSON.stringify(items));
  };

  removeItem = (id: number) => {
    const {items} = this.state;

    const updatedItems = items.filter(item => {
      item.id !== id;
    });
    this.setState({items: updatedItems});
    this.saveItems(updatedItems);
  };

  renderItems = ({item}: {item: Item}) => {
    return (
      <View style={styles.itemsView}>
        <Image
          source={require('../Images/pngwing2.png')}
          style={{height: 100, width: 100, resizeMode: 'center'}}
        />
        <Text style={styles.items}> {item.name} </Text>
        <Text style={styles.items}> ${item.price} </Text>
        <TouchableOpacity onPress={() => this.removeItem(item.id)}>
          <Text style={styles.items}>-</Text>
        </TouchableOpacity>
      </View>
    );
  };

  gobackPage = () => {
    this.props.navigation.goBack();
  };

  handleLogout = async () => {
    const detailsString = await AsyncStorage.getItem('adminData');
    if (detailsString !== null) {
      let crenderntials = JSON.parse(detailsString);
    }

    const removedata = await AsyncStorage.removeItem('adminData');
    this.props.navigation.navigate('LoginPage');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity>
          <Image source={require('../Images/left-arrow.png')} />
        </TouchableOpacity>
        <Icon name="clockcircleo" size={30} />
        <View style={styles.iconView}>
          <Text style={styles.adminText}>Admin</Text>
          <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
            <Image source={require('../Images/plus.png')} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.centerdeModal}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Add Item"
                onChangeText={newItemName => this.setState({newItemName})}
                style={styles.input}
              />
              <TextInput
                placeholder="Price"
                onChangeText={newItemPrice => this.setState({newItemPrice})}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => this.addItem()}
                style={styles.addButton}>
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <FlatList
          data={this.state.items}
          renderItem={this.renderItems}
          keyExtractor={item => item.name}
        />
        <View>
          <TouchableOpacity onPress={this.handleLogout} style={styles.button}>
            <Text>Logout</Text>
          </TouchableOpacity>
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
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '6%',
  },
  modalView: {
    height: '50%',
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '10%',
    backgroundColor: 'pink',
    borderRadius: 10,
    justifyContent: 'center',
  },
  centerdeModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '40%',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    alignSelf: 'center',
    margin: '4%',
  },
  addButton: {
    padding: 10,
    alignItems: 'center',
    width: '40%',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: '4%',
  },
  itemsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 'auto',
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '2%',
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    width: '60%',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  adminText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  items: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  line: {
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
  },
  itemContainer: {},
});

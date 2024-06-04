import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';

interface Props {
  title: string;
  color: string;
}

interface Item {
  title: string;
}

const Buttons:React.FC<Props> = () => {
  const data = [
    {id: 1, title: 'All'},
    {id: 2, title: 'Offers'},
    {id: 3, title: 'Popular'},
    {id: 4, title: 'nearest'},
    {id: 5, title: 'fast Delivery'},
    {id: 6, title: 'pure veg'},
    {id: 7, title: 'Previously Ordered'},
  ];

  const renderItems = ({item}: {item: Item}) => {
    return (
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItems}
        keyExtractor={item => item.title}
        horizontal
      />
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  buttonView: {
    flexDirection: 'row',
    margin: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
});

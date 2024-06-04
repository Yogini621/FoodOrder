// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// export default function CalculatorPage() {
//   const [expression, setExpression] = useState('');

//   const handleButtonPress = (value:string) => {
//     setExpression(prev => prev + value);
//   };

//   const handleClear = () => {
//     setExpression('');
//   };

  
//   const handlePercentage = () => {
//     setExpression(prev => (parseFloat(prev) / 100).toString());
//   };

//   const handleEqual = () => {
//     try {
//       const result = calculateResult(expression);
//       setExpression(result);
//     } catch (error) {
//       setExpression('Error');
//     }
//   };

//   const calculateResult = (expression:string) => {
//     const parts = expression.split(/([+\-*/])/);
//     console.log(parts)
//     // Perform multiplication and division
//     for (let i = 0; i < parts.length; i++) {
//       if (parts[i] === '*' || parts[i] === '/') {
//         const num1 = parseFloat(parts[i - 1]);
//         const num2 = parseFloat(parts[i + 1]);

//         const result = parts[i] === '*' ? num1 * num2 : num1 / num2;
//         parts.splice(i - 1, 3, result.toString());
//         i--;
//       }
//     }

//     // perform addition and subtraction
//     for (let i = 0; i < parts.length; i += 1) {
//       if (parts[i] === '+' || parts[i] === '-') {
//         const num1 = parseFloat(parts[i - 1]);
//         const num2 = parseFloat(parts[i + 1]);

//         const result = parts[i] === '+' ? num1 + num2 : num1 - num2;
//         parts.splice(i - 1, 3, result.toString());
//         i--;
//       }
//     }
//     return parts[0];
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.inputView}></View>
//       <View style={styles.heightView}>
//         <TextInput
//           placeholder="0"
//           onChangeText={setExpression}
//           value={expression}
//           placeholderTextColor="white"
//           style={styles.input}
//         />
//         <View style={styles.numberButtonView}>
//           <TouchableOpacity
//             style={[styles.numberButton, {backgroundColor: '#b88a40'}]}
//             onPress={handleClear}>
//             <Text style={styles.buttonText}>C</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.numberButton, {backgroundColor: '#b88a40'}]}>
//             <Text style={styles.buttonText}>+/-</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.numberButton, {backgroundColor: '#b88a40'}]}
//             onPress={handlePercentage}>
//             <Text style={styles.buttonText}>%</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.numberButton, {backgroundColor: '#b88a40'}]}
//             onPress={() => handleButtonPress('/')}>
//             <Text style={styles.buttonText}>/</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.numberButtonView}>
//           <TouchableOpacity
//             style={styles.numberButton1}
//             onPress={() => handleButtonPress('7')}>
//             <Text style={styles.buttonText}>7</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.numberButton1}
//             onPress={() => handleButtonPress('8')}>
//             <Text style={styles.buttonText}>8</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.numberButton1}
//             onPress={() => handleButtonPress('9')}>
//             <Text style={styles.buttonText}>9</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.numberButton, {backgroundColor: '#b88a40'}]}
//             onPress={() => handleButtonPress('*')}>
//             <Text style={styles.buttonText}>*</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.numberButtonView}>
//           <TouchableOpacity
//             style={styles.numberButton1}
//             onPress={() => handleButtonPress('4')}>
//             <Text style={styles.buttonText}>4</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.numberButton1}
//             onPress={() => handleButtonPress('5')}>
//             <Text style={styles.buttonText}>5</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.numberButton1}
//             onPress={() => handleButtonPress('6')}>
//             <Text style={styles.buttonText}>6</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.numberButton, {backgroundColor: '#b88a40'}]}
//             onPress={() => handleButtonPress('-')}>
//             <Text style={styles.buttonText}>-</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.numberButtonView}>
//           <TouchableOpacity
//             style={styles.numberButton1}
//             onPress={() => handleButtonPress('1')}>
//             <Text style={styles.buttonText}>1</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.numberButton1}
//             onPress={() => handleButtonPress('2')}>
//             <Text style={styles.buttonText}>2</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.numberButton1}
//             onPress={() => handleButtonPress('3')}>
//             <Text style={styles.buttonText}>3</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.numberButton, {backgroundColor: '#b88a40'}]}
//             onPress={() => handleButtonPress('+')}>
//             <Text style={styles.buttonText}>+</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.numberButtonView}>
//           <TouchableOpacity
//             style={[styles.numberButton1, {width: 160, borderRadius: 38}]}
//             onPress={() => handleButtonPress('0')}>
//             <Text style={styles.buttonText}>0</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.numberButton1}
//             onPress={() => handleButtonPress('.')}>
//             <Text style={styles.buttonText}>.</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.numberButton, {backgroundColor: '#b88a40'}]}
//             onPress={handleEqual}>
//             <Text style={styles.buttonText}>=</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1.5,
//     backgroundColor: 'black',
//   },
//   numberButtonView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 20,
//   },
//   numberButton: {
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//     backgroundColor: '#75727a',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 4,
//   },
//   numberButton1: {
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//     backgroundColor: '#444247',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 4,
//   },
//   input: {
//     color: 'white',
//     fontSize: 50,
//     fontWeight: '600',
//     alignSelf:'flex-end',
//     padding:10
//   },
//   inputView: {
//     width: '100%',
//     paddingVertical: 20,
//     paddingHorizontal: 36,
//     marginHorizontal: 2,
//   }, 
//   heightView: {
//     top: 200,
//   },
// });


import { View, Text } from 'react-native'
import React from 'react'
import CalculatorPage from './Calculator/CalculatorPage'

export default function App() {
  return (
 <CalculatorPage />
  )
}
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      accumulator: 0,
      clearOnNext: true,
      operation: undefined
    }
  }

  performOperation() {
    let { accumulator, operation, displayValue } = this.state;
    if (operation === '+')
      accumulator += parseFloat(displayValue); 
    else if (operation === '-')
      accumulator -= parseFloat(displayValue); 
    else if (operation === '*')
      accumulator *= parseFloat(displayValue); 
    else if (operation === '/')
      accumulator /= parseFloat(displayValue); 
    return accumulator;
  }

  pressNum(value) {
    let { displayValue, clearOnNext } = this.state;
    if (clearOnNext) {
      displayValue = ''; clearOnNext = false;
    }
    if (displayValue !== '0' && value !== '0')
      displayValue += value;
    this.setState({ displayValue, clearOnNext });
  }

  pressDecimal() {
    let { displayValue, clearOnNext } = this.state;
    if (clearOnNext) {
      displayValue = '0'; clearOnNext = false;
    }
    if (displayValue.indexOf('.') === -1) {
      displayValue += '.';
      this.setState({ displayValue, clearOnNext });
    }
  }

  pressOperator(operation) {
    const { displayValue } = this.state;
    this.performOperation();
    const accumulator = parseFloat(displayValue);
    this.setState({ operation, accumulator, clearOnNext: true});
  }

  pressEquals() {
    const accumulator = this.performOperation();
    this.setState({ displayValue: accumulator.toString(), clearOnNext: true });
  }

  pressClear() {
    this.setState({ operation: undefined, displayValue: '0', clearOnNext: true, accumulator: 0 });
  }

  render() {
    const { displayValue } = this.state;
    return (
      <View style={styles.calculator}>
        <View style={styles.row}>
          <Text style={styles.displayPanel} testID="DisplayPanel">{displayValue}</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.pressClear()} testID="C">
              <Text style={styles.button}>C</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.pressNum('7')} testID="7">
              <Text style={styles.button}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressNum('8')} testID="8">
              <Text style={styles.button}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressNum('9')} testID="9">
              <Text style={styles.button}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressOperator('/')} testID="/">
              <Text style={styles.button}>÷</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.pressNum('4')} testID="4">
              <Text style={styles.button}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressNum('5')} testID="5">
              <Text style={styles.button}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressNum('6')} testID="6">
              <Text style={styles.button}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressOperator('*')} testID="*">
              <Text style={styles.button}>*</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.pressNum('1')} testID="1">
              <Text style={styles.button}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressNum('2')} testID="2">
              <Text style={styles.button}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressNum('3')}  testID="3">
              <Text style={styles.button}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressOperator('-')} testID="-">
              <Text style={styles.button}>-</Text>
          </TouchableOpacity>
        </View> 
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.pressNum('0')} testID="0">
              <Text style={styles.button}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressDecimal()} testID=".">
              <Text style={styles.button}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressEquals()} testID="=">
              <Text style={styles.button}>=</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressOperator('+')} testID="+">
              <Text style={styles.button}>+</Text>
          </TouchableOpacity>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calculator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(4, 28, 67)',
  },
  row: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgb(4, 28, 67)',
    flexDirection: 'row',
    width: '100%',
  },
  displayPanel: {
    borderRadius: 10,
    fontSize: 50,
    color: '#fff',
    width: '94%',
    fontWeight: '800',
    textAlign: 'right',
    margin: 10,
    padding: 10,
    backgroundColor: 'rgb(4, 28, 67)',
    borderColor: '#3079ED',
    borderWidth: 3
  },
  button: {
    borderRadius: 10,
    color: '#fff',
    fontSize: 40,
    width: 80,
    height: 80,
    backgroundColor: '#4C8FFB',
    borderColor: '#3079ED',
    borderWidth: 3,
    fontWeight: '800',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    margin: 10,
  },
});

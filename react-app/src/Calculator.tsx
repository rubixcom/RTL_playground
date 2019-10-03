import React from 'react';
import './Calculator.css';

enum Operator {
  multiply='×', divide='÷', add='+', subtract='-'
}

interface Props { }
interface State {
  displayValue: string;
  accumulator: number;
  operation?: Operator;
  clearOnNext: boolean;
}

interface ButtonProps {
  testId: string,
  onClick: () => void,
  label: string
}

const Button = ({ testId, onClick, label }: ButtonProps) => (
  <div className="Button" data-testid={testId} onClick={onClick}>{label}</div>
)


class Calculator extends React.Component<Props, State> {
  constructor(props: React.Props<Props>) {
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
    if (operation === Operator.add)
      accumulator += parseFloat(displayValue); 
    else if (operation === Operator.subtract)
      accumulator -= parseFloat(displayValue); 
    else if (operation === Operator.multiply)
      accumulator *= parseFloat(displayValue); 
    else if (operation === Operator.divide)
      accumulator /= parseFloat(displayValue); 
    return accumulator;
  }

  pressNum(value: string) {
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

  pressOperator(operation: Operator) {
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
      <div className="App">
        <div className="Calculator">
          <div className="DisplayPanel" data-testid="DisplayPanel">{displayValue}</div>
          <div></div>
          <div></div>
          <div></div>
          <Button onClick={() => this.pressClear()} testId={'C'} label={'C'}></Button>
          <Button onClick={() => this.pressNum('7')} testId={'7'} label={'7'}></Button>
          <Button onClick={() => this.pressNum('8')} testId={'8'} label={'8'}></Button>
          <Button onClick={() => this.pressNum('9')} testId={'9'} label={'9'}></Button>
          <Button onClick={() => this.pressOperator(Operator.divide)} testId={'/'} label={'÷'}></Button>
          <Button onClick={() => this.pressNum('4')} testId={'4'} label={'4'}></Button>
          <Button onClick={() => this.pressNum('5')} testId={'5'} label={'5'}></Button>
          <Button onClick={() => this.pressNum('6')} testId={'6'} label={'6'}></Button>
          <Button onClick={() => this.pressOperator(Operator.multiply)} testId={'*'} label={'x'}></Button>
          <Button onClick={() => this.pressNum('1')} testId={'1'} label={'1'}></Button>
          <Button onClick={() => this.pressNum('2')} testId={'2'} label={'2'}></Button>
          <Button onClick={() => this.pressNum('3')} testId={'3'} label={'3'}></Button>
          <Button onClick={() => this.pressOperator(Operator.subtract)} testId={'-'} label={'-'}></Button>
          <Button onClick={() => this.pressNum('0')} testId={'0'} label={'0'}></Button>
          <Button onClick={() => this.pressDecimal()} testId={'.'} label={'.'}></Button>
          <Button onClick={() => this.pressEquals()} testId={'='} label={'='}></Button>
          <Button onClick={() => this.pressOperator(Operator.add)} testId={'+'} label={'+'}></Button>
        </div>
      </div>
    );
  }
}

export default Calculator;

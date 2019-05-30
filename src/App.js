import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.next = 0;
    this.op = null;
    this.total = null;
  }

  handleClick = (event, symbol) => {
    event.preventDefault();

    console.log(symbol);

    switch (symbol) {
      case 'AC':
        this.next = 0;
        this.op = null;
        this.total = null;
        this.setState({ value: 0 });
        break;
      case '+/-':
        this.next = parseFloat(this.next - (this.next * 2))
        this.setState({ value: this.next });
        break;
      case '%':
        this.next = this.next / 100;
        this.setState({ value: this.next });
        break;
      case '/':
        this.setOp('/');
        break;
      case 7:
        this.setNext(7);
        break;
      case 8:
        this.setNext(8);
        break;
      case 9:
        this.setNext(9);
        break;
      case 'X':
        this.setOp('X');
        break;
      case 4:
        this.setNext(4);
        break;
      case 5:
        this.setNext(5);
        break;
      case 6:
        this.setNext(6);
        break;
      case '-':
        this.setOp('-');
        break;
      case 1:
        this.setNext(1);
        break;
      case 2:
        this.setNext(2);
        break;
      case 3:
        this.setNext(3);
        break;
      case '+':
        this.setOp('+');
        break;
      case 0:
        this.setNext(0);
        break;
      case '.':
        if (!this.next.toString().includes('.')) {
          this.next = this.next.toString() + '.';
          parseFloat(this.next);
          this.setState({ value: this.next });
        }
        break;
      case '=':
        if (this.op != null) {
          this.calculate();
        }
        break;
      default:
        break;
    }
  }

  setOp = (operator) => {
    if (this.op == null) {
      this.op = `${operator}`;
      this.total = this.next;
      this.next = 0;
      this.setState({ value: this.next });
    } else {
      this.calculate();
      this.next = 0;
      this.op = '+';
    }
  }

  setNext = (num) => {
    this.next = this.next.toString() + num;
    this.next = parseFloat(this.next);
    this.setState({ value: this.next });
  }

  calculate = () => {

    let answer;

    console.log('calculate!', this.next, this.total);

    switch (this.op) {
      case '/':
        answer = this.total / this.next;
        break;
      case 'X':
        answer = this.total * this.next;
        break;
      case '-':
        answer = this.total - this.next;
        break;
      case '+':
        answer = this.total + this.next;
        break;
      default:
        answer = NaN;
        break;
    }

    this.total = answer;
    this.next = answer;
    this.op = null;
    this.setState({ value: answer });

  }

  render() {
    return (
      <div className='App'>
        <div className='value-viewport'>
          {this.state.value}
        </div>
        <div className='button-viewport'>
          {['AC', '+/-', '%', '/', 7, 8, 9, 'X', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '=', 'Made with love <3 and a night of no sleep'].map((element, index) => {
            if (!isNaN(parseFloat(element)) || element === 'Made with love <3 and a night of no sleep') {
              return (
                <div className='num-button' onClick={event => this.handleClick(event, element)}>
                  {element}
                </div>
              )
            } else {
              return (
                <div className='com-button' onClick={event => this.handleClick(event, element)}>
                  {element}
                </div>
              )
            }
          })}
        </div>
      </div>
    );
  }
}


/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

// const { createTestScheduler } = require("jest");

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
  }

  subtract(num) {
    this.result -= num;
  }

  multiply(num) {
    this.result *= num;
  }

  divide(num) {
    if (num === 0) throw new Error("Division by Zero");
    this.result /= num;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    expression = expression.trim();
    if (!Calculator.isValidExpression(expression)) throw new Error("Invalid Expression");
    while (expression.includes("(") && expression.includes(")")) {
      const startIndex = expression.indexOf("(");
      let endIndex;
      let openParenthesisCount = 0;
      for (let i = startIndex; i < expression.length; i++) {
        if (expression[i] === "(") openParenthesisCount++;
        else if (expression[i] === ")") openParenthesisCount--;
        if (openParenthesisCount === 0) {
          endIndex = i;
          break;
        }
      }
      const newExpression = expression.slice(startIndex + 1, endIndex);
      const result = this.calculate(newExpression);
      expression = expression.slice(0, startIndex).concat(result.toString(), expression.slice(endIndex + 1, expression.length));
    }

    const stack = Calculator.parseExpresssionToStack(expression);
    if (stack.operation.length === 1 && stack.number.length === 2) {
      const secondOperand = stack.number.pop();
      const firstOperand = stack.number.pop();
      const operation = stack.operation.pop();

      this.result = Calculator.calculateOperation(operation, firstOperand, secondOperand);
      return this.result;
    } else if (stack.operation.length > 1) {
      const precedenceOrder = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
      };

      const operatorStackWithPrecedence = [];
      for (let i = 0; i < stack.operation.length; i++) {
        if (operatorStackWithPrecedence.length === 0) {
          operatorStackWithPrecedence.push([stack.operation[i], i]);
          continue;
        }
        const lastOperator = operatorStackWithPrecedence.at(-1)[0];
        if (precedenceOrder[lastOperator] > precedenceOrder[stack.operation[i]]) {
          operatorStackWithPrecedence.splice(i - 1, 0, [stack.operation[i], i]);
        } else {
          operatorStackWithPrecedence.push([stack.operation[i], i]);
        }
      }

      const operationsDone = [];
      const operatorStackWithPrecedenceLength = operatorStackWithPrecedence.length
      for (let i = 0; i < operatorStackWithPrecedenceLength; i++) {
        const currentOperation = operatorStackWithPrecedence.pop();
        const firstOperandIndex = currentOperation[1];
        const secondOperandIndex = firstOperandIndex + 1;
        let offset = 0;
        for (let operationIndex of operationsDone) {
          if (operationIndex < currentOperation[1]) offset++;
        }
        const firstOperand = stack.number[firstOperandIndex - offset];
        const secondOperand = stack.number[secondOperandIndex - offset];
        const result = Calculator.calculateOperation(currentOperation[0], firstOperand, secondOperand);
        stack.number[firstOperandIndex - offset] = result;
        stack.number.splice(secondOperandIndex - offset, 1);
        operationsDone.push(currentOperation[1]);
      }
    }

    this.result = stack.number.pop();
    return this.result;
  }

  static calculateOperation(operation, firstOperand, secondOperand) {
    if (operation === "/" && secondOperand === 0) throw new Error("Division By Zero");

    switch (operation) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
    }
  }

  static parseExpresssionToStack(expression) {
    const stack = {
      number: [],
      operation: [],
    };

    let digitIndexStart = null;

    let lastCharIsOperand = false;
    let lastCharIsUnaryOperand = false;
    for (let i = 0; i < expression.length; i++) {
      if ("*/+-".includes(expression[i])) {
        if (lastCharIsOperand) {
          lastCharIsUnaryOperand = true;
          continue;
        }
        stack.operation.push(expression[i]);
        lastCharIsOperand = true;
      }
      if (Calculator.isDigit(expression[i])) {
        lastCharIsOperand = false;
        if (digitIndexStart === null) digitIndexStart = i;
      }
      if (
        (!Calculator.isDigit(expression[i]) && i != 0 && digitIndexStart != null) || 
        (Calculator.isDigit(expression[i]) && i === expression.length - 1)
        ) {
          if (lastCharIsUnaryOperand) digitIndexStart--;
          if (expression[i] === ".") continue;
          lastCharIsUnaryOperand = false;
          let parsedNumber;
          if (Calculator.isDigit(expression[i]) && i === expression.length - 1) i++;
          parsedNumber = +expression.slice(digitIndexStart, i);
          
          if (Calculator.isDigit(expression[i]) && i === expression.length) i--;
          digitIndexStart = null;
          if (parsedNumber != NaN) stack.number.push(parsedNumber);
          else throw new Error(`Parse Error: failed while trying to parse ${expression.slice(digitIndexStart, i)}`);
        }
    }

    return stack;
  }

  static isValidExpression(expression) {
    const validChars = "()/-+*0123456789. ";
    const stack = [];
    for (let i = 0; i < expression.length; i++) {
      if (!validChars.includes(expression[i])) return false;
      if (expression[i] === "(") stack.push("(");
      if (expression[i] === ")") {
        if (stack.length === 0) return false;
        else stack.pop();
      }
    }
    if (stack.length === 0) return true;
    else return false;
  }

  static isDigit(char) {
    return "0123456789".includes(char);
  }
}

module.exports = Calculator;

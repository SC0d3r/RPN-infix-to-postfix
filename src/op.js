const err = require('./uitls').err;

const operators = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2
}
const operatorFunctions = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
}

function op(operator) {
  const isOp = x => ['+', '-', '*', '/'].indexOf(x) >= 0;
  const checkOp = x => !isOp(x) ? err('pass an operator') : '';
  checkOp(operator);

  return {
    isGT: function (x) {
      checkOp(x);
      return operators[operator] > operators[x];
    },
    isLT: function (x) {
      checkOp(x);
      return operators[operator] < operators[x];
    },
    isEQ: function (x) {
      checkOp(x);
      return operators[operator] === operators[x];
    },
    eval(firstOperand = 0, secondOperand = 0) {
      return operatorFunctions[operator](secondOperand , firstOperand);
    }
  }

}

module.exports = {
  op
}
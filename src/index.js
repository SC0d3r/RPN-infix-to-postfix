const {infixToPostfix} = require('./infix-to-postfix');
const {postfixSolver} = require('./postfix-solver');
const {Stack} = require('./stack');

function solve(expr = '', stack) {
  stack = stack || new Stack(300);
  return postfixSolver(infixToPostfix(expr, stack));
}


module.exports = {
  infixToPostfix , postfixSolver , Stack , solve
}
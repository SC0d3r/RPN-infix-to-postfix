const Stack = require('./stack').Stack;
const {err , isNum , isOp} = require('./utils');
const op = require('./op').op;

function postfixSolver(postfixExpr = []){
  const resultStack = new Stack(postfixExpr.length);
  postfixExpr.forEach(calc);

  return resultStack.size && resultStack.pop();

  function calc(x,i){
    
    if(isNum(+x)) return resultStack.push(+x);
    if(!isOp(x)) err('Weird Input by infixToPostfix => '+x);

    resultStack.push(
      op(x).eval(resultStack.pop(),resultStack.pop())
    );
  }
} 

module.exports = {
  postfixSolver
}
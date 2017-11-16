const { Stack } = require('./stack');
const { err, flat, removeAllWhitespace, removeNil } = require('./utils');
const { parserMaker } = require('./parserMaker');


function infixToPostfix(expression = '', operatorsStack) {
  if (operatorsStack === undefined)
    err(`Give infixToPostfix an instance of Stack class 
    [ex : infixToPostfix(expression = '', new Stack(100)) `);

  if (expression === '') return [];
  if (/[a-z]+/gi.test(expression)) err('pass only numbers');

  const splitted = removeAllWhitespace(expression).split('');

  const parser = parserMaker(operatorsStack,infixToPostfix);
  const intermediateExpr = splitted.map(parser).filter(removeNil);
  flat(intermediateExpr);

  const finalExpr = intermediateExpr.slice(0);
  const remainingOperatorsInStack = operatorsStack.toString();
  remainingOperatorsInStack.forEach(op => finalExpr.push(op));
  return finalExpr;

}

module.exports = {
  infixToPostfix
}

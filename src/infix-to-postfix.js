const Stack = require('./stack').Stack;
const { err, isNum, isOp, flat } = require('./uitls');
const op = require('./op').op;

const EMPTY_SPOT = '_';
const OPEN_PAREN = '(';
const CLOSE_PAREN = ')';

function infixToPostfix(expression = '', operatorsStack) {
  if (operatorsStack === undefined)
    err(`Give infixToPostfix an instance from Stack class 
    [ex : infixToPostfix(expression = '', new Stack(100)) `);

  if (expression === '') return [];
  if (/[a-z]+/gi.test(expression)) err('pass only numbers');

  const splitted = removeAllSpaces(expression);

  const parser = parserMaker(operatorsStack);
  const intermediateExpr = splitted.map(parser).filter(removeNil);
  flat(intermediateExpr);

  const finalExpr = intermediateExpr.slice(0);
  const remainingOperatorsInStack = stackToStr(operatorsStack);
  remainingOperatorsInStack.forEach(op => finalExpr.push(op));
  return finalExpr;

}

function removeAllSpaces(expr) {
  return expr.replace(/\s+/g, '').split('');
}

module.exports = {
  infixToPostfix
}

// helper functions


function parserMaker(opStack) {
  mustHaveStackOrThrows(opStack);
  return function _parser(x, i, arr) {

    if (x === EMPTY_SPOT) return;

    const multiDigitNumber = readMultiDigitNumber(i, arr);
    if (multiDigitNumber) {
      replaceDigitsWithEmptySpot(multiDigitNumber, arr, i);
      return multiDigitNumber;
    }

    if (x === OPEN_PAREN) {
      const expressionInParens = fetchExprInParens(arr, i);
      const postfixedInsideParens = infixToPostfix(
        expressionInParens.join(''),
        new Stack(expressionInParens.length)
      );
      replaceExprInParensWithEmptySpots(
        arr,
        i,
        expressionInParens
      );
      return postfixedInsideParens;
    }

    let shouldReturn;
    if (!opStack.isEmpty()) {
      shouldReturn = returnOperatorsFromStackGreaterThan(opStack, x);
      shouldReturn = leftToRightEvalRule(opStack, x, shouldReturn);
    }

    pushNewOpToStack(opStack, x);
    return shouldReturn || undefined;
  }
}

function fetchExprInParens(arr, i) {
  return arr.slice(i + 1, indexOfClosingParen(arr, i));
}

function replaceExprInParensWithEmptySpots(
  arr,
  i,
  expressionInParens
) {

  arr.splice(
    i,
    expressionInParens.length + 2,
    ...Array(expressionInParens.length + 2).fill(EMPTY_SPOT)
  );
}

function indexOfClosingParen(arr, i) {
  let cursor = 1;
  let openedParens = 0;
  for (; ;) {
    if (cursor >= arr.length)
      err('close the the openning paren in index [' + i + ']');
    let currentElement = arr[i + cursor];
    if (currentElement === OPEN_PAREN) openedParens++;
    if (currentElement === CLOSE_PAREN) {
      if (openedParens === 0) break;
      openedParens--;
    }
    cursor++;
  }
  return cursor + i;
}

function returnOperatorsFromStackGreaterThan(opStack, operator) {
  let shouldReturn = '';
  while (op(operator).isLT(opStack.peek())) {
    shouldReturn += opStack.pop();
    if (opStack.isEmpty())
      break;
  }
  return shouldReturn;
}

function pushNewOpToStack(opStack, op) {
  opStack.push(op);
}

function leftToRightEvalRule(opStack, operator, shouldReturn) {
  if (shouldReturn === '' && op(operator).isEQ(opStack.peek()))
    shouldReturn = opStack.pop();
  return shouldReturn;
}

function replaceDigitsWithEmptySpot(multiDigitNumber, arr, i) {
  const splittedDigit = multiDigitNumber.toString().split('');
  for (let index in splittedDigit)
    arr[i + (+index)] = EMPTY_SPOT;
}

function readMultiDigitNumber(i, arr) {
  let counter = i;
  let multiDigitNumber = 0;
  while (isNum(+arr[counter])) {
    multiDigitNumber = multiDigitNumber * 10 + (+arr[counter]);
    counter++;
  }
  return multiDigitNumber;
}

function mustHaveStackOrThrows(opStack) {
  if (!opStack instanceof Stack)
    err("pass an stack");
}

function removeNil(x) {
  return x !== undefined && x !== null && !Number.isNaN(x);
}

function stackToStr(stack) {
  if (!stack instanceof Stack) err("pass an stack");
  const result = [];
  try {
    for (; ;) result.push(stack.pop());
  } catch (e) {
    return result;
  }
}


const { Stack } = require('./stack');
const { err, isNum, isOp } = require('./utils');
const {op} = require('./op');

const EMPTY_SPOT = '_';
const OPEN_PAREN = '(';
const CLOSE_PAREN = ')';

function parserMaker(opStack,recursiveInfixToPostfix) {
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
      const postfixedInsideParens = recursiveInfixToPostfix(
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


module.exports = {
  parserMaker
}
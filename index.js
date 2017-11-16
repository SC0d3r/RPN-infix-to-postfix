const infixToPostfix = require('./src/infix-to-postfix').infixToPostfix;
const postfixSolver = require('./src/postfix-solver').postfixSolver;
const Stack = require('./src/stack').Stack;

function solve(expr = '', stack) {
  stack = stack || new Stack(300);
  return postfixSolver(infixToPostfix(expr, stack));
}


if (typeof process.argv[2] === 'string') {
  const { shouldShowOnlyPostfix, expr } = parseProcessArgs();

  if (shouldShowOnlyPostfix)
    console.log(`\n> ${turnInfixToPostfix(expr)}\n`);
  else
    console.log(`\n> ${solve(expr, new Stack(expr.length))}\n`);
}


module.exports = {
  infixToPostfix, postfixSolver, solve , Stack
}



function turnInfixToPostfix(expr) {
  return infixToPostfix(expr, new Stack(expr.length)).join(' ');
}

function parseProcessArgs() {
  const maybeExpr = process.argv[2];
  const maybeOnlyPostfix = process.argv[3];
  const expr = maybeExpr === '-postfix' ? maybeOnlyPostfix : maybeExpr;
  const shouldShowOnlyPostfix = maybeExpr === '-postfix' ? maybeExpr : maybeOnlyPostfix;
  return { shouldShowOnlyPostfix, expr };
}

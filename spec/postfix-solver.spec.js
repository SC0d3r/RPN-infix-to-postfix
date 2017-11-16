const postfixSolver = require('../src/postfix-solver').postfixSolver;
const infixToPostfix = require('../src/infix-to-postfix').infixToPostfix;
const Stack = require('../src/stack').Stack;
describe('[Function] postfixSolver',function(){
  let operatorStack;
  beforeEach(function(){
    operatorStack = new Stack(50);
  });
  it('should solve the postfix expression',function(){
    let expr = '1+2';
    // console.time('Performance on small expression');
    let postfix = infixToPostfix(expr,operatorStack)
    let result = postfixSolver(postfix);
    // console.timeEnd('Performance on small expression');
    expect(result).toBe(3);

    expr = '1+2*5';
    postfix = infixToPostfix(expr,operatorStack)
    expect(postfixSolver(postfix)).toBe(11);

    expr = '1+2*5+1';
    postfix = infixToPostfix(expr,operatorStack)
    expect(postfixSolver(postfix)).toBe(12);

    expr = '2*1+2*5+1';
    postfix = infixToPostfix(expr,operatorStack)
    expect(postfixSolver(postfix)).toBe(13);

    expr = '2*1+2*6/3+1';
    postfix = infixToPostfix(expr,operatorStack)
    expect(postfixSolver(postfix)).toBe(7);


    expr = '2*1+2*6/3+1*8/2/2+81/9/9';
    postfix = infixToPostfix(expr,operatorStack)
    expect(postfixSolver(postfix)).toBe(9);

    expr = '2546*89789/585-965+658*1+2*6/3+1*8/2/2+81/9/9*995/458-6932+89345+56/985-99';
    // console.time('Performance on big expression');
    postfix = infixToPostfix(expr,operatorStack)
    result = postfixSolver(postfix);
    // console.timeEnd('Performance on big expression');
    expect(result).toBe(472789.23617948167);


    // parens

    expr = '1*(2+3)';
    postfix = infixToPostfix(expr,operatorStack)
    expect(postfixSolver(postfix)).toBe(5);

    expr = '3*(2+3)+(7*9*8)+9';
    postfix = infixToPostfix(expr,operatorStack)
    expect(postfixSolver(postfix)).toBe(528);

    expr = '5*(3*(2+6))';
    postfix = infixToPostfix(expr,operatorStack)
    expect(postfixSolver(postfix)).toBe(120);


    expr = '5*((2+6)*(5+6*8))';
    postfix = infixToPostfix(expr,operatorStack)
    expect(postfixSolver(postfix)).toBe(eval(expr));

    expr = '(5*((2+6)*(5+6*8 + (4*(2+4))))) + ((2 + 4) / 8 + (2 * (3 - 4)))';
    postfix = infixToPostfix(expr,operatorStack)
    expect(postfixSolver(postfix)).toBe(eval(expr));
  });
  
});
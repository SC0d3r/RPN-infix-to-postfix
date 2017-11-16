const infixToPostfix = require('../src/infix-to-postfix').infixToPostfix;
const Stack = require('../src/stack').Stack;

describe('[function] infixToPostfix',function(){
  let operatorStack;
  beforeEach(function(){
    operatorStack = new Stack(50);
  });
  it('should turn expr given into postfix',function(){
    let expr = '1+2';
    expect(infixToPostfix(expr,operatorStack).join('')).toBe('12+');
    
    expr = '1+2*5';
    expect(infixToPostfix(expr,operatorStack).join('')).toBe('125*+');

    expr = '1+2*5+1';
    expect(infixToPostfix(expr,operatorStack).join('')).toBe('125*1++');

    expr = '2*5+1';
    expect(infixToPostfix(expr,operatorStack).join('')).toBe('25*1+');

    expr = '2+9/3/3';
    expect(infixToPostfix(expr,operatorStack).join('')).toBe('293/3/+');

    expr = '2*1+2*6/3+1';
    expect(infixToPostfix(expr,operatorStack).join('')).toBe('21*26*3/1++');

    // with parens

    expr = '1*(2+3)';
    expect(infixToPostfix(expr,operatorStack).join('')).toBe('123+*');

    expr = '5*((2+6)*(5+6*8))';
    expect(infixToPostfix(expr , operatorStack).join('')).toBe('526+568*+**');
  });
  
  it('should throw if parens does not match',function(){
    let expr = '1 * (2+4';
    expect(lackOfClosingParen(expr, operatorStack)).toThrow();
  })
})

function lackOfClosingParen(expr, operatorStack) {
  return function(){
    return infixToPostfix(expr, operatorStack).join('');
  }
}

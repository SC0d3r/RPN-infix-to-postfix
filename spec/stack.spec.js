const Stack = require('../src/stack').Stack;
describe('Stack class',function(){
  let stack;
  beforeEach(function(){
    stack = new Stack(5);
  });

  describe('[Method] push',function(){
    it('should push items into stack',function(){
      expect(stack.isEmpty()).toBe(true);
      stack.push(1);
      expect(stack.isEmpty()).toBe(false);
    });
    it('should throw error if stack is allready full',function(){
      expect(stack.isEmpty()).toBe(true);
      stack.push(1);
      stack.push(1);
      stack.push(1);
      stack.push(1);
      stack.push(1);
      expect(function(){stack.push(1);}).toThrow();
    });
  });

  describe('[Method] pop',function(){
    it('should give the last element added to stack',function(){
      stack.push(1);
      stack.push(2);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(1);
    });
    it('should throw error if stack is empty',function(){
      stack.push(1);
      stack.pop();
      expect(function(){stack.pop()}).toThrow();
    });
  });
});
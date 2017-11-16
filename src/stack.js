const err = require('./uitls').err;

class Stack {
  constructor(size = 5){
    this.size = size;
    this._container = new Array(size);
    this._pointer = 0;
  }
  push(item){
    if(item === undefined) err("pass an item to push");
    if(this.isFull()) err("Stack is full");
    this._container[this._pointer++] = item;
  }
  pop(){
    if(this.isEmpty()) err("Stack is empty");
    return this._container[--this._pointer];
  }
  peek(){
    if(this.isEmpty()) err("Stack is empty");
    return this._container[this._pointer - 1];
  }
  isEmpty(){
    return this._pointer === 0;
  }
  empty(){
    this._container = new Array(size);
    this._pointer = 0;
  }
  isFull(){
    return this._pointer === this.size;
  }
}

module.exports = {
  Stack
}

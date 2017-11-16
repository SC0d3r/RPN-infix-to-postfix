function err(msg){
  throw new Error(msg);
}
const isNum = x => !Number.isNaN(x) && typeof x === 'number';
const isOp = x => ['+', '-', '*', '/'].indexOf(x) >= 0;

const flat = arr => {
  for(let i = arr.length - 1;i >= 0;i--){
    let x = arr[i];
    if(Array.isArray(x)) arr.splice(i,1,...x);
  }
}

function removeAllWhitespace(expr) {
  return expr.replace(/\s+/g, '');
}

function removeNil(x) {
  return x !== undefined && x !== null && !Number.isNaN(x);
}

module.exports = {
  err,isNum,isOp,flat,removeAllWhitespace,removeNil
}
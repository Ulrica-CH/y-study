const MagicString = require('magic-string');
// const {Bundle}= require('magic-string');
const sourceCode = `export var a = 1;`; 
const ms = new MagicString(sourceCode);
// MagicString {}
console.log(ms)
// export var a = 1;
console.log(ms.toString())
//还可以用用来合并代码 ,MagicString.Bundle = Bundle;
let bundle = new MagicString.Bundle();
bundle.addSource({
  content: 'var a = 1;',
  separator: '\n'
});
bundle.addSource({
  content: 'var b = 2;',
  separator: '\n'
});
console.log(bundle.toString());
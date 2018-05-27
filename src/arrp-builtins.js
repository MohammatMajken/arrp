'use strict';
const ArrpSymbol = require(__dirname + '/ArrpSymbol.js');

const ArrpMacro = require(__dirname + '/ArrpMacro.js');
const ArrpFunction = require(__dirname + '/ArrpFunction.js');
const ArrpSpecial = require(__dirname + '/ArrpSpecial.js');

const builtins = new Map();
builtins.set('quote', new ArrpSpecial((env, arrpEval, val) =>　{
  return val;
}));

builtins.set('if', new ArrpSpecial((env, arrpEval, cond, thenSexp, elseSexp) =>　{
  return arrpEval(cond) !== false? arrpEval(thenSexp): arrpEval(elseSexp);
}));

builtins.set('lambda', new ArrpSpecial((env, arrpEval, params, ...body) =>　{
  return new ArrpFunction(env, params, body);
}));

builtins.set('progn', new ArrpSpecial((env, arrpEval, ...body) =>　{
    let tmp = null;
    body.forEach((sexp) => {
      tmp = arrpEval(sexp);
    });
    return tmp;
}));

builtins.set('set!', new ArrpSpecial((env, arrpEval, sym, val) =>　{
  return env.set(sym, arrpEval(val));
}));

// Array
builtins.set('arrayp', (val) =>　{
  return val instanceof Array ;
}));

builtins.set('nth', (arr, ind) =>　{
  return arr[ind] ;
}));





// Logical
builtins.set('not', (arg) => arg === false? true: false);

// Arithemetic　
builtins.set('+', (...numbers) =>　numbers.reduce((prev, curr) => prev + curr));
builtins.set('-', (top, ...numbers) => numbers.length === 0? - top: top - numbers.reduce((prev, curr) => prev + curr));
builtins.set('*', (...numbers) =>　numbers.reduce((prev, curr) => prev * curr));
builtins.set('/', (top, ...numbers) => numbers.length === 0? 1 / top: top / numbers.reduce((prev, curr) => prev * curr));


module.exports = builtins;

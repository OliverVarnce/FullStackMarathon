'use strict'

const numberVar = 42;
const bigIntVar = 42n;
const stringVar = 'text';
const booleanVar = true;
const nullVar = null;
const emptyVar = undefined;
const objectVar = {
    firstVar: 1,
    secondVar: 2};
const symbolVar = Symbol('id')
function myFunctionVar() {
}

alert ('numberVar is ' + typeof(numberVar) +
    '\nbigIntVar is ' + typeof(bigIntVar) +
    '\nstringVar is ' + typeof(stringVar) +
    '\nbooleanVar is ' + typeof(booleanVar) +
    '\nnullVar is ' + typeof(nullVar) +
    '\nemptyVar is ' + typeof(emptyVar) +
    '\nobjectVar is ' + typeof(objectVar) +
    '\nsymbolVar is ' + typeof(symbolVar) +
    '\nmyFunctionVar is ' + typeof(myFunctionVar));
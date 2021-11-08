const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
const curry = (fn) => {
    const arity = fn.length;
  
    return function $curry(...args) {
      if (args.length < arity) {
        return $curry.bind(null, ...args);
      }
  
      return fn.call(null, ...args);
    };
};
const trace = curry((tag, x) => {
    console.log(tag, x);
    return x;
});
const querySelector = (selector, element) => {
  return element.querySelector(selector);
};
const append = curry((parent, element) => {
  parent.append(element);

  return element;
})
const dataGet = (dataName, element) => {
  return element.dataset[dataName];
}
const dataSet = curry((dataName, dataValue, element) => {
  element.dataset[dataName] = dataValue;

  return element;
});
const dataIdSet = dataSet('id');


const getTail = (el) => {
  return el[el.length - 1];
}
/* const memoize = (fn) => {
    let cache = {};

    return (...args) => {
      let n = args[0];

      if (n in cache) {
        console.log('Fetching from cache');
        return cache[n];
      }
      else {
        console.log('Calculating result');
        let result = fn(n);
        cache[n] = result;
        return result;
      }
    }
} */

/* const getElementAndParent = curry((selector, parent) => {
    const element = parent.querySelector(selector);
    return {element, parent}
}); */

export {compose, curry, trace, querySelector, dataIdSet, dataGet};
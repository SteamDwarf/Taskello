/**
 * @description Последовательно выполняет все переданные функции, начиная с последней. 
 *              Последующая функция принимают значение, возвращаемое предыдущей функцией.
 * @param fns - функции 
 */
 export const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

/**
 * @description 
 * @param  fn - функция
 * @returns 
 */
 export const curry = (fn) => {
    const arity = fn.length;
  
    return function $curry(...args) {
      if (args.length < arity) {
        return $curry.bind(null, ...args);
      }
  
      return fn.call(null, ...args);
    };
};
export const trace = curry((tag, x) => {
    console.log(tag, x);
    return x;
});
export const querySelector = (selector, element) => {
  return element.querySelector(selector);
};
export const append = curry((parent, element) => {
  parent.append(element);

  return element;
})
export const dataGet = (dataName, element) => {
  return element.dataset[dataName];
}
export const dataSet = curry((dataName, dataValue, element) => {
  element.dataset[dataName] = dataValue;

  return element;
});
export const dataIdSet = dataSet('id');

export const copyObject = curry((savingArray, srcObject) => {
  let distObject = {};
  Object.assign(distObject, srcObject);

  if(savingArray) {
      savingArray.push(distObject);
  }

  return srcObject;
});

export const getTail = (el) => {
  return el[el.length - 1];
}
export function hideElementsByBodyClick(target, elementClass, showElementBtnClass) {
  let elements;

  if(target.classList.contains(showElementBtnClass)) {
      return;
  }
  
  elements = document.querySelectorAll(`.${elementClass}`);
  elements.forEach(element => {
      if(!element.classList.contains('hide')) {
          element.classList.add('hide');
      }
  });
}

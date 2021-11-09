import { curry, dataSet } from "./utils";

export const createElement = curry((innerHTML, elClass, tag, props) => {
    let element = document.createElement(tag);

    element.innerHTML = innerHTML;
    element.classList.add(elClass);

    props.domEl = element;

    return props;
});
export const dataSetFromProps = curry((dataName, props) => {
    let {dataValue, domEl} = props;

    dataSet(dataName, dataValue, domEl);

    return props;
});
export const setProp = curry((propKey, propValue, props) => {
    props[propKey] = propValue;

    return props;
});
export const replaceProp = curry((srcProp, distProp, props) => {
    props[distProp] = props[srcProp];

    return props;
});
export const appendElement = props => {
    let {parent, domEl} = props;

    parent.append(domEl);

    return props;
};
export const replaceElement = props => {
    let {parent, domEl} = props;

    parent.innerHTML = '';
    parent.append(domEl);

    return props;
}
export const getDataFromModal = props => {
    const {modal} = props;
    const inputs = modal.querySelectorAll('input');

    inputs.forEach(input => {
        props[input.dataset.type] = input.value;
    });

    return props;
}
export const setElementTitle = curry((titleBlock, props) => {
    let {title} = props;

    titleBlock.textContent = title;

    return props;
});

export const setElementColor = curry(props =>{
    let {colors, domEl} = props;
    let colorInd = Math.floor(Math.random() * colors.length);
    let color = colors[colorInd];
    
    domEl.classList.add(color);

    return props;
});

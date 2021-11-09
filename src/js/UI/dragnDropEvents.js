import {curry} from '../utils';

let choosedItem;

const setHolderDragnDrop = curry((props) => {
    let {domEl, dragItemSelector} = props;

    domEl.addEventListener('dragover', (e) => dragOver(e, domEl.querySelector('.main'), dragItemSelector));
    domEl.addEventListener('drop', (e) => drop(e, domEl, dragItemSelector));

    return props;
});
function setItemDragnDrop(props) {
    let {domEl} = props;

    domEl.setAttribute('draggable', 'true');
    domEl.addEventListener('dragstart', (e) => dragStart(e, domEl));
    domEl.addEventListener('dragend', dragEnd);

    return props;
}

function dragStart(e, item) {
    choosedItem = item;
    e.target.classList.add('hold');
}

function dragEnd(e) {
    e.target.classList.remove('hold');
    choosedItem = null;
}

function dragOver(e, holder, dragItemSelector) {
    e.preventDefault();

    let afterElement;

    if(!choosedItem) {
        return;
    }

    afterElement = getDragAfterElement(holder, dragItemSelector, e.clientY);

    if(!afterElement) {
        holder.append(choosedItem);
    } else {
        afterElement.before(choosedItem);
    }
}


function drop(e, holder, dragItemClass) {
    /* let curElement;

    if(dragItemClass === '.column') {
        curElement = holder.querySelector(dragItemClass);
        choosedItem.parentNode.append(curElement);
        holder.append(choosedItem);
        holder.classList.remove('over');
    } else if(dragItemClass === '.card') {
        holder.append(choosedItem);
        holder.classList.remove('over');
    } */
}

function getDragAfterElement(holder, dragItemSelector, y) {
    const draggableItems = [...holder.querySelectorAll(`${dragItemSelector}:not(.hold)`)];
    let afterElement;

    afterElement =  draggableItems.reduce((prevItem, curItem) => {
        const box = curItem.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if(offset < 0 && offset > prevItem.offset) {
            return {offset: offset, element: curItem}
        } else {
            return prevItem;
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element;

    return afterElement;
}

export {setHolderDragnDrop, setItemDragnDrop};
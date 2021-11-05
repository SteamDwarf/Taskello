import {curry} from '../utils';

let choosedItem;

const setHolderDragnDrop = curry((dragItemSelector, holder) => {
    holder.addEventListener('dragover', (e) => dragOver(e, holder.querySelector('.main'), dragItemSelector));
    holder.addEventListener('drop', (e) => drop(e, holder, dragItemSelector));

    return holder;
});
function setItemDragnDrop(item) {
    item.setAttribute('draggable', 'true');

    item.addEventListener('dragstart', (e) => dragStart(e, item));
    item.addEventListener('dragend', dragEnd);

    return item;
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

    let afterElement = getDragAfterElement(holder, dragItemSelector, e.clientY);

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

function getDragAfterElement(holder, dragItemClass, y) {
    const draggableItems = [...holder.querySelectorAll(`${dragItemClass}:not(.hold)`)];
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
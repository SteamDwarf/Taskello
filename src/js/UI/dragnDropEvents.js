let choosedItem;

function setHolderDragnDrop(holder, dragItemClass) {
    holder.addEventListener('dragover', (e) => dragOver(e, holder, dragItemClass));
    holder.addEventListener('dragleave', () => dragLeave(holder));
    holder.addEventListener('drop', (e) => drop(e, holder, dragItemClass));
}
function setItemDragnDrop(item) {
    item.addEventListener('dragstart', (e) => dragStart(e, item));
    item.addEventListener('dragend', dragEnd);
}

function dragStart(e, item) {
    choosedItem = item;
    e.target.classList.add('hold');
        
    /* setTimeout(() => {
        e.target.classList.add('hide');
    }, 0); */
}

function dragEnd(e) {
    /* e.target.classList.remove('hide'); */
    e.target.classList.remove('hold');
    choosedItem = null;
}

function dragOver(e, holder, dragItemClass) {
    e.preventDefault();
    /* holder.classList.add('over'); */

    let afterElement = getDragAfterElement(holder, dragItemClass, e.clientY);
    if(!afterElement) {
        holder.append(choosedItem);
    } else {
        afterElement.before(choosedItem);
    }

    /* holder.classList.remove('over'); */
}

function dragLeave(holder) {
    /* holder.classList.remove('over'); */
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
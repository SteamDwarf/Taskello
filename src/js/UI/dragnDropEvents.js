let choosedItem;

function setHolderDragnDrop(holder, holderClass, dragItemClass) {
    holder.addEventListener('dragover', dragOver);
    holder.addEventListener('dragenter', () => dragEnter(holder));
    holder.addEventListener('dragleave', (e) => dragLeave(holder));
    holder.addEventListener('drop', () => drop(holder, dragItemClass));
}
function setItemDragnDrop(item) {
    item.addEventListener('dragstart', (e) => dragStart(e, item));
    item.addEventListener('dragend', dragEnd);
}

function dragStart(e, item) {
    choosedItem = item;
    e.target.classList.add('hold');
        
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('hide');
    choosedItem = null;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(holder) {
    holder.classList.add('over');
}

function dragLeave(holder) {
    holder.classList.remove('over');
}

function drop(holder, dragItemClass) {
    let curElement;

    curElement = holder.querySelector(dragItemClass);
    choosedItem.parentNode.append(curElement);
    holder.append(choosedItem);
    holder.classList.remove('over');
}

export {setHolderDragnDrop, setItemDragnDrop};
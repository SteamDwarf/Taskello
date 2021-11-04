import {setHolderDragnDrop, setItemDragnDrop} from './dragnDropEvents';

const boardsManager = () => {
    const mainBoardEl = document.querySelector('.main-board');
    //const columnHolders = document.querySelectorAll('.column-holder');
    const columnElementInner = `
        <header class="header flex-column">
            <div class="create_btn" data-create="column">
                <h4 class="title">Создать новую колонку</h4>
                <span>+</span>
            </div>
            <div class="naming-block hide">
                <input type="text" class="name_input input">
                <div class="btn-block">
                    <button class="cancel-btn btn">Отмена</button>
                    <button class="confirm-btn btn">Подтвердить</button>
                </div>
            </div>
            <div class="finished-block hide">
                <h4 class="title"></h4>
                <div class="options-btn">&#8942;</div>
                <ul class="options-list hide">
                    <li class="option-element" data-action="rename">Переименовать</li>
                    <li class="option-element" data-action="delete">Удалить</li>
                </ul>
            </div>
        </header>
        <div class="main">
        </div>
        <div class="create_btn create_card hide" data-create="card">
                <h4 class="title">Создать карточку</h4>
                <span>+</span>
        </div>
    `;
    const cardElementInner = `
        <div class="naming-block">
            <input type="text" class="name_input input">
            <div class="btn-block">
                <button class="cancel-btn btn">Отмена</button>
                <button class="confirm-btn btn">Подтвердить</button>
            </div>
        </div>
        <div class="finished-block hide">
            <div class="title"></div>
            <div class="options-btn">&#8942;</div>
            <ul class="options-list hide">
                <li class="option-element" data-action="rename">Переименовать</li>
                <li class="option-element" data-action="delete">Удалить</li>
            </ul>
        </div>
    `;
    const cardColors = ['green', 'red', 'purple', 'yellow'];

    let columns = [];
    let cards = [];
    let choosedItem;

    function createColumn() {
        let col = document.createElement('div');
        let holder = document.createElement('div'); 
        let columnMain;

        col.innerHTML = columnElementInner;
        columnMain = col.querySelector('.main');

        col.classList.add('column');
        holder.classList.add('column-holder');

        col.setAttribute('data-state', 'non-initialized');
        //col.setAttribute('draggable', 'true');

        holder.append(col);
        mainBoardEl.append(holder);

        setEventListeners(col);
        setHolderDragnDrop(columnMain, '.card');
/*         setHolderDragnDrop(holder, '.column');
        setItemDragnDrop(col); */
    }
    function createCard(column) {
        let card = document.createElement('div');
        let colorInd = Math.floor(Math.random() * cardColors.length);
        let color = cardColors[colorInd];
        let columnMain = column.querySelector('.main');

        card.innerHTML = cardElementInner;
        card.classList.add('card');
        card.classList.add(color);
        card.setAttribute('data-state', 'non-initialized');
        card.setAttribute('draggable', 'true');

        columnMain.append(card);
        cards.push(card);

        setEventListeners(card);
        
        setItemDragnDrop(card);
    }

    function setEventListeners(element) {
        let columnCreateBtn;
        let cardCreateBtn;

        const elementNamingBlock = element.querySelector('.naming-block');
        const elementOptionsList = element.querySelector('.options-list');
        const cancelBtn = element.querySelector('.cancel-btn');
        const confirmBtn = element.querySelector('.confirm-btn');
        const elementFinishedBlock = element.querySelector('.finished-block');
        const elementNameInput = element.querySelector('.name_input');
        const elementOptionsBtn = element.querySelector('.options-btn');
        const renameBtn = element.querySelector('[data-action="rename"]');
        const deleteBtn = element.querySelector('[data-action="delete"]');

        if(element.classList.contains('column')) {
            columnCreateBtn = element.querySelector('[data-create="column"]');
            cardCreateBtn = element.parentNode.querySelector('[data-create="card"]');

            columnCreateBtn.addEventListener('click', () => showTitleBlock(element, columnCreateBtn, elementNamingBlock, elementOptionsList, true));
            cardCreateBtn.addEventListener('click', () => createCard(element));
        } 

        
        cancelBtn.addEventListener('click', () => cancelNaming(element));
        confirmBtn.addEventListener('click', () => setElementName(element, elementNameInput, elementFinishedBlock, elementNamingBlock));
        elementOptionsBtn.addEventListener('click', () => {
            elementOptionsList.classList.toggle('hide');
        });
        renameBtn.addEventListener('click', () => showTitleBlock(element, elementFinishedBlock, elementNamingBlock, elementOptionsList));
        deleteBtn.addEventListener('click', () => deleteColumn(element));
    }

    function showTitleBlock(element, oldBlock, namingBlock, optionsList, isCreate) {
        oldBlock.classList.add('hide');
        optionsList.classList.add('hide');
        namingBlock.classList.remove('hide');

        if(isCreate) {
            element.classList.toggle('created');
        }
    }
    function cancelNaming(element) {
        let namingBlock = element.querySelector('.naming-block');
        let finishedBlock = element.querySelector('.finished-block');
        let elementCreateBtn = element.querySelector('.create_btn');

        if(element.getAttribute('data-state') === 'non-initialized') {
            elementCreateBtn.classList.remove('hide');
            element.classList.remove('created');
        } else if(element.getAttribute('data-state') === 'initialized') {
            finishedBlock.classList.remove('hide');
        }

        namingBlock.classList.add('hide'); 
    }
    function setElementName(element, nameInput, finishedBlock, namingBlock) {
        let title = nameInput.value;
        let titleEl = finishedBlock.querySelector('.title');

        titleEl.textContent = title;
        namingBlock.classList.add('hide');
        finishedBlock.classList.remove('hide');

        nameInput.value = '';

        if(element.getAttribute('data-state') === 'non-initialized') {
            element.setAttribute('data-state', 'initialized');

            if(element.classList.contains('column')) {
                element.querySelector('[data-create="card"]').classList.remove('hide');
                createColumn();
                //createCard(element);
            } else if(element.classList.contains('card')) {
                //createCard(element.parentNode.parentNode);
            }
        } 

    }
    function deleteColumn(element) { 
        let placeholder;

        if(element.classList.contains('column')) {
            placeholder = element.parentNode;
            placeholder.remove();
        }

        element.remove();
    }

    createColumn();
};

export default boardsManager;
import { addColumn } from "../Board";
import card from "./card";

const column = (col, createColumn) => {
    const mainBoardEl = document.querySelector('.main-board');
    const columnElementInner = `
        <header class="column_header flex-column">
            <div class="column-create_btn">
                <h4 class="column_title">Создать новую колонку</h4>
                <span>+</span>
            </div>
            <div class="column_naming-block hide">
                <input type="text" class="column-name_input input">
                <div class="column_btn-block">
                    <button class="cancel-btn btn">Отмена</button>
                    <button class="confirm-btn btn">Подтвердить</button>
                </div>
            </div>
            <div class="column_finished-block hide">
                <h4 class="column_title"></h4>
                <div class="column_options-btn">&#8942;</div>
                <ul class="column_options-list hide">
                    <li class="column_option-element" data-action="rename">Переименовать</li>
                    <li class="column_option-element" data-action="delete">Удалить</li>
                </ul>
            </div>
        </header>
        <div class="column_main"></div>
    `;
    
/*     function createColumn() {
        let col = document.createElement('div');

        col.innerHTML = columnElementInner;
        col.classList.add('column');

        setEventListeners(col);

        mainBoardEl.append(col);
    } */
    function setEventListeners(col) {
        const colCreateBtn = col.querySelector('.column-create_btn');
        const colNamingBlock = col.querySelector('.column_naming-block');
        const colFinishedBlock = col.querySelector('.column_finished-block');
        const colNameInput = col.querySelector('.column-name_input');
        const cancelBtn = col.querySelector('.cancel-btn');
        const confirmBtn = col.querySelector('.confirm-btn');
        const colOptionsBtn = col.querySelector('.column_options-btn');
        const colOptionsList = col.querySelector('.column_options-list');
        const renameBtn = col.querySelector('[data-action="rename"]');
        const deleteBtn = col.querySelector('[data-action="delete"]');

        colCreateBtn.addEventListener('click', () => showTitleBlock(colCreateBtn, colNamingBlock, colOptionsList, true));
        cancelBtn.addEventListener('click', () => cancelNaming(col));
        confirmBtn.addEventListener('click', () => setColName(colNameInput, colFinishedBlock, colNamingBlock, colCreateBtn));
        colOptionsBtn.addEventListener('click', () => {
            colOptionsList.classList.toggle('hide');
        });
        renameBtn.addEventListener('click', () => showTitleBlock(colFinishedBlock, colNamingBlock, colOptionsList));
        deleteBtn.addEventListener('click', () => deleteColumn(col));

        col.addEventListener('drop', dragDrop);
        col.addEventListener('dragover', dragOver);
        col.addEventListener('dragenter', dragEnter);
        col.addEventListener('dragleave', dragLeave);
    }

    function showTitleBlock(oldBlock, namingBlock, optionsList, isCreate) {
        oldBlock.classList.add('hide');
        optionsList.classList.add('hide');
        namingBlock.classList.remove('hide');

        if(isCreate) {
            oldBlock.parentNode.parentNode.classList.toggle('created');
        }
    }

    function cancelNaming(col) {
        let colCreateBtn = col.querySelector('.column-create_btn');
        let namingBlock = col.querySelector('.column_naming-block');
        let finishedBlock = col.querySelector('.column_finished-block');

        if(colCreateBtn) {
            colCreateBtn.classList.remove('hide');
            col.classList.remove('created');
        } else {
            finishedBlock.classList.remove('hide');
        }
        
        namingBlock.classList.add('hide');
    }
    
    function setColName(nameInput, finishedBlock, namingBlock) {
        let title = nameInput.value;
        let titleEl = finishedBlock.querySelector('.column_title');
        let colCreateBtn = finishedBlock.parentNode.parentNode.querySelector('.column-create_btn');

        titleEl.textContent = title;
        namingBlock.classList.add('hide');
        finishedBlock.classList.remove('hide');

        nameInput.value = '';

        if(colCreateBtn) {
            card(colCreateBtn.parentNode.parentNode.querySelector('.column_main'));
            colCreateBtn.remove();
            createColumn(); 
        }
    }
    function deleteColumn(col) { 
        col.remove();
    }

    function dragDrop(e) {
        //e.target.append(choosedItem);
        e.target.classList.remove('hovered');
        //changeProcessClass(e.target);
    }
    function dragOver(e) {
        e.preventDefault();
    }
    function dragEnter(e) {
        e.target.classList.add('hovered');
    }
    function dragLeave(e) {
        e.target.classList.remove('hovered');
    }
    
    //createColumn();
    setEventListeners(col);
};

export default column;
import { addColumn } from "../Board";

const columns = () => {
    const mainBoardEl = document.querySelector('.main-board');
    /* const createColumnsBtns = document.querySelectorAll('.column-create_btn'); */
    
    let columnsEl;
    let createColumnBtn;
    let columnTitleInput;
    let columnCancelBtn;
    let columnConfirmBtn;
    let createdColumns = [];
    

    const defaultState = `
        <div class="column-create_btn">
            <h4 class="column_title">Создать новую колонку</h4>
            <span>+</span>
        </div>
    `;
    const creatingState = `
        <input type="text" class="column-name_input input">
        <div class="column_btn-block">
            <button class="cancel-btn btn">Отмена</button>
            <button class="confirm-btn btn">Подтвердить</button>
        </div>
    `;
    const createdState = `
        <header class="column_header">
            <h4 class="column_title"></h4>
            <div class="column_options-btn">&#8942;</div>
            <ul class="column_options-list hide">
                <li class="column_option-element" data-action="rename">Переименовать</li>
                <li class="column_option-element" data-action="delete">Удалить</li>
            </ul>
        </header>
    `;

    function setEventListeners() {
        createColumnBtn = document.querySelector('.column-create_btn');
        columnsEl = document.querySelectorAll('.column');

        if(createColumnBtn) {
            createColumnBtn.addEventListener('click', (e) => {
                columnsEl.forEach(col => {
                    if(e.target.parentNode === col || e.target.parentNode.parentNode === col) {
                        col.classList.toggle('activated');
                        col.innerHTML = creatingState;

                        columnTitleInput = col.querySelector('.column-name_input');
                        columnCancelBtn = col.querySelector('.cancel-btn');
                        columnConfirmBtn = col.querySelector('.confirm-btn');

                        columnConfirmBtn.addEventListener('click', () => createColumn(col));
                        columnCancelBtn.addEventListener('click', () => cancelCreating(col));
                        return;
                    }
                });
            });
        }
    }


    function cancelCreating(column) {
        column.innerHTML = defaultState;
        column.classList.remove('activated');
        setEventListeners();
    } 

    function createColumnObj(column, title) {
        let newColumnObj = {};

        if(createdColumns.length === 0) {
            newColumnObj.id = 0;
        } else {
            newColumnObj.id = ++createdColumns[createdColumns.length - 1].id;
        }
        newColumnObj.element = column;
        newColumnObj.title = title;
        newColumnObj.notes = [];
        createdColumns.push(newColumnObj);

        addColumn(newColumnObj);
    }
    function createColumn(column) {
        let title = columnTitleInput.value;
        let newColumn = document.createElement('div');

        column.innerHTML = createdState;
        column.querySelector('.column_title').textContent = title;
        column.classList.add('created');
        column.classList.remove('activated');

        newColumn.classList.add('column');
        newColumn.innerHTML = defaultState;
        mainBoardEl.append(newColumn);

        column.querySelector('.column_options-btn').addEventListener('click', (e) => showColumnOptions(e.target));
        column.querySelector('[data-action="rename"]').addEventListener('click', (e) => renameColumn(e.target));
        column.querySelector('[data-action="delete"]').addEventListener('click', (e) => deleteColumn(e.target));

        setEventListeners();
        createColumnObj(column, title);
        
    } 

    function showColumnOptions(btn) {
        btn.parentNode.querySelector('.column_options-list').classList.toggle('hide');
    }
    function renameColumn(btn) {
        let colHeader = btn.parentNode.parentNode;

        colHeader.innerHTML = creatingState;
        colHeader.classList.add('flex-column');
    }
    function deleteColumn(btn) {
        btn.parentNode.parentNode.parentNode.remove();
    }

    setEventListeners();
};

export default columns;
import { addColumn, renameColumn } from "../Board";

const columns = () => {
    const mainBoardEl = document.querySelector('.main-board');
    
    let columnsEl;
    let createColumnBtn;
    let createdColumns = [];
    

    const defaultState = `
        <div class="column-create_btn">
            <h4 class="column_title">Создать новую колонку</h4>
            <span>+</span>
        </div>
    `;
    const namingState = `
        <input type="text" class="column-name_input input">
        <div class="column_btn-block">
            <button class="cancel-btn btn">Отмена</button>
            <button class="confirm-btn btn">Подтвердить</button>
        </div>
    `;
    const createdState = `
        <h4 class="column_title"></h4>
        <div class="column_options-btn">&#8942;</div>
        <ul class="column_options-list hide">
            <li class="column_option-element" data-action="rename">Переименовать</li>
            <li class="column_option-element" data-action="delete">Удалить</li>
        </ul>
    `;

    function setEventListeners() {
        createColumnBtn = document.querySelector('.column_header');
        columnsEl = document.querySelectorAll('.column');

        if(createColumnBtn) {
            createColumnBtn.addEventListener('click', (e) => {
                columnsEl.forEach(col => {
                    if((e.target.parentNode === createColumnBtn || e.target.parentNode.parentNode === createColumnBtn) && !col.classList.contains('activated')) {
                        changeState('naming', col, true);
                        return;
                    }
                });
            });
        }
    }

    function changeState(state, col, isNew) {
        let columnConfirmBtn;
        let columnCancelBtn;

        switch (state) {
            case 'default':
                col.querySelector('.column_header').innerHTML = defaultState;
                col.classList.remove('activated');
                setEventListeners();
                break;
            case 'naming':
                col.classList.toggle('activated');

                col.querySelector('.column_header').innerHTML = namingState;
                columnConfirmBtn = col.querySelector('.confirm-btn');
                columnCancelBtn = col.querySelector('.cancel-btn');

                columnConfirmBtn.addEventListener('click', () => setColumnName(col, isNew));
                columnCancelBtn.addEventListener('click', () => cancelCreating(col, isNew));
                break;
            case 'created':
                let columnTitleInput = col.querySelector('.column-name_input');
                let title = columnTitleInput.value;

                col.querySelector('.column_header').innerHTML = createdState;
            
                col.querySelector('.column_title').textContent = title;
                col.classList.add('created');
                col.classList.remove('activated');

                col.querySelector('.column_options-btn').addEventListener('click', (e) => showColumnOptions(e.target));
                col.querySelector('[data-action="rename"]').addEventListener('click', (e) => renameColumn(e.target));
                col.querySelector('[data-action="delete"]').addEventListener('click', (e) => deleteColumn(e.target));
                break;
        }
    }

    function createColumn(column) {
        let newColumn = document.createElement('div');
        setColumnName(column);

        newColumn.classList.add('column');
        newColumn.innerHTML = defaultState;
        mainBoardEl.append(newColumn);

        setEventListeners();
    } 

    function setColumnName(col, isNew) {
        changeState('created', col);
    }

    function cancelCreating(col, isNew) {
        if(!isNew) {
            let header = col.querySelector('.column_header');
            let oldTitle = header.textContent;

            changeState('created', col);
            header.textContent = oldTitle;
            return;
        }

        changeState('default', col);
    } 

    function createColumnObj(column) {
        let newColumnObj = {};

        if(createdColumns.length === 0) {
            newColumnObj.id = 0;
        } else {
            newColumnObj.id = ++createdColumns[createdColumns.length - 1].id;
        }
        newColumnObj.element = column;
        newColumnObj.notes = [];
        createdColumns.push(newColumnObj);

        addColumn(newColumnObj);
    }
    

    function showColumnOptions(btn) {
        btn.parentNode.querySelector('.column_options-list').classList.toggle('hide');
    }
    function renameColumn(btn) {
        let colHeader = btn.parentNode.parentNode;

        colHeader.innerHTML = namingState;
        colHeader.classList.add('flex-column');

        setColumnName(colHeader);
    }
    function deleteColumn(btn) {
        btn.parentNode.parentNode.parentNode.remove();
    }

    setEventListeners();
};

export default columns;
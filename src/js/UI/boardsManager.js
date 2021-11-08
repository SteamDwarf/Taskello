import {setHolderDragnDrop, setItemDragnDrop} from './dragnDropEvents';
import { compose, curry, trace, querySelector, dataSet } from '../utils';
import { addNewBoard } from './boardList';
import { setFile } from '../Board';
import modals from './modals';


const boardsManager = (boardHolder, currentBoardTitle) => {
    let currentBoard;
    let boards = [];
    
    const boardInner = `
        <main class="board_main holder"> </main>
        <div class="create_btn" data-create="column">
            <h4 class="title">Создать колонку</h4>
            <span>+</span>
        </div>
    `;
    const columnElementInner = `
        <header class="header flex-column">           
            <div class="naming-block">
                <input type="text" class="name_input input">
                <div class="btn-block">
                    <button class="cancel-btn btn">Отмена</button>
                    <button class="confirm-btn btn">Подтвердить</button>
                </div>
            </div>
            <div class="finished-block hide">
                <h4 class="title column_title"></h4>
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

    const createElement = curry((innerHTML, elClass, tag, props) => {
        let element = document.createElement(tag);

        element.innerHTML = innerHTML;
        element.classList.add(elClass);

        props.domEl = element;

        return props;
    });
    const createColumn = createElement(columnElementInner, 'column', 'div');
    const createCard = createElement(cardElementInner, 'card', 'div');
    const createBoard = createElement(boardInner, 'board', 'div');

    const dataSetElement = curry((dataName, props) => {
        let {dataValue, domEl} = props;

        dataSet(dataName, dataValue, domEl);

        return props;
    });
    const dataStateSet = dataSetElement('state');
    const dataIDSet = dataSetElement('id');

    const setProp = curry((propKey, propValue, props) => {
        props[propKey] = propValue;

        return props;
    });
    const replaceProp = curry((srcProp, distProp, props) => {
        props[distProp] = props[srcProp];

        return props;
    });
    const copyObject = curry((savingArray, srcObject) => {
        let distObject = {};
        Object.assign(distObject, srcObject);

        if(savingArray) {
            savingArray.push(distObject);
        }

        return srcObject;
    });
    const appendElement = props => {
        let {parent, domEl} = props;

        parent.append(domEl);

        return props;
    };
    const replaceElement = props => {
        let {parent, domEl} = props;

        parent.innerHTML = '';
        parent.append(domEl);

        return props;
    }
    const getDataFromModal = props => {
        props.title = props.modal.querySelector('input').value;

        return props;
    }
    const setElementTitle = curry((titleBlock, props) => {
        let {title} = props;

        titleBlock.textContent = title;

        return props;
    });

    const setElementColor = curry(props =>{
        let {colors, domEl} = props;
        let colorInd = Math.floor(Math.random() * colors.length);
        let color = colors[colorInd];
        
        domEl.classList.add(color);

        return props;
    });

    /**
     @description Функция привязывает к кнопке создание определенно элемента
     @param func - функция, создающая определенный элемент
     @param parent - элемент родитель, в который добавится созданный элемент
     @param btnHandler - элемент в котором находится кнопка создания
    */
    const createBtnSetEvent = curry((func, btnHandler, props) => {
        let createBtn;
        let {parent} = props;

        if(btnHandler) {
            createBtn = btnHandler.querySelector('.create_btn');
        } else {
            createBtn = querySelector('.create_btn', props.domEl)
        }
        
        if(parent == null) {
            props.parent = querySelector('.holder', props.domEl);
        }
        createBtn.addEventListener('click', () => func(props));
        /* if(parent == null) {
            createBtn.addEventListener('click', () => func(querySelector('.holder', props.domEl)));
        } else {
            createBtn.addEventListener('click', () => func(props));
        } */

    });

    const openBoard = curry((boards, boardID) => {
        //boardHolder.innerHTML = '';
        boards.forEach(board => {
            if(board.id == boardID) {
                currentBoard = board.boardEl;
                currentBoardTitle.textContent = board.title;
                replaceElement({parent: boardHolder, domEl: board.domEl})
            }
        });
        //boardHolder.append(currentBoard);
    });
/*     const unsetCurrentBoard = curry((currentBoard) => {
        let parent;

        if(!currentBoard) {
            return centralBlock;
        }

        parent  = currentBoard.parentNode;
        currentBoard.remove();
        return parent;
    }); */


    /**
     * @description Создает колонку, добавляет ее в DOM дерево, привзяывается всю необходимую обработку событий
     * @param props - объект с необходимыми параеметрами:
     *  @param dataValue - значение аттрибута data
     *  @param parent - родительский элемент, в который будет вставляться созданеный элемент
     */
    const setColumn = compose(
        setElementEditables,
        setHolderDragnDrop,
        appendElement,
        dataStateSet,
        createColumn,
        setProp('dataValue', 'non-initialized')
    );
    const setCard = compose(
        setElementEditables,
        setItemDragnDrop,
        setElementColor,
        appendElement,
        dataStateSet,
        createCard
    );
    const setBoard = compose (
        createBtnSetEvent(setColumn, null),
        addNewBoard(openBoard(boards)),
        setProp('parent', null),
        setElementTitle(currentBoardTitle),
        replaceElement,
        setProp('parent', boardHolder),
        trace('after create'),
        copyObject(boards),
        createBoard,
        getDataFromModal
    );

    /* function createBoard(modal) {
        let title = modal.querySelector('input').value;
        let parent = boardHolder;
        let board;
        let boardObj = {};
        let props = {}
        

        currentBoardTitle.textContent = title;
        boardHolder.innerHTML = '';

        
        board = createElement(boardInner, 'board', 'div', {}).domEl;
        appendElement({parent, domEl: board});
        boardObj.boardEl = board;
        boardObj.id = Date.now();
        boardObj.title = title;
        currentBoard = boardObj.boardEl;
        boards.push(boardObj);

        props.dataValue = 'non-initialized';
        props.parent = board.querySelector('.holder');

        addNewBoard(boardObj.id, title, openBoard(boards));
        createBtnSetEvent(setColumn, board, props);
    } */

    /* const createElement = curry((innerHTML, elClass, parent) => {
        let element = document.createElement('div');

        element.innerHTML = innerHTML;
        element.classList.add(elClass);
        element.setAttribute('data-state', 'non-initialized');

        parent.append(element);

        return element;
    }); */

    

    /* const createColumn = compose(
        setElementEditables, 
        setHolderDragnDrop('.card'), 
        createElement(columnElementInner, 'column')
    );
    const createCard = compose(
        setElementEditables, 
        setItemDragnDrop, 
        setElementColor(cardColors), 
        createElement(cardElementInner, 'card')
    ); */

/*     const createBoard = compose(

        createBtnSetEvent(createColumn, null),
        setBoard,
        dataIdSet(Date.now()),
        createElement(boardInner, 'board'),
        unsetCurrentBoard
    ); */



    
    

    //setColumn({dataValue: 'non-initialized', parent: boardHolder});

    modals('#create-board-btn', '.modal', '.modal_close', '#create-board_btn', setBoard);
    

    function setElementEditables(props) {
        let {domEl} = props;

        const elementNamingBlock = domEl.querySelector('.naming-block');
        const elementOptionsList = domEl.querySelector('.options-list');
        const cancelBtn = domEl.querySelector('.cancel-btn');
        const confirmBtn = domEl.querySelector('.confirm-btn');
        const elementFinishedBlock = domEl.querySelector('.finished-block');
        const elementNameInput = domEl.querySelector('.name_input');
        const elementOptionsBtn = domEl.querySelector('.options-btn');
        const renameBtn = domEl.querySelector('[data-action="rename"]');
        const deleteBtn = domEl.querySelector('[data-action="delete"]');

        cancelBtn.addEventListener('click', () => cancelNaming(domEl));
        confirmBtn.addEventListener('click', () => setElementName(domEl, elementNameInput, elementFinishedBlock, elementNamingBlock));
        elementOptionsBtn.addEventListener('click', () => {
            elementOptionsList.classList.toggle('hide');
        });
        renameBtn.addEventListener('click', () => showTitleBlock(domEl, elementFinishedBlock, elementNamingBlock, elementOptionsList));
        deleteBtn.addEventListener('click', () => deleteElement(domEl));
        domEl.addEventListener('click', (e) => {
            if(e.target.classList.contains('options-btn')) {
                return;
            }
            let optionsList = domEl.querySelectorAll('.options-list');

            optionsList.forEach(list => {
                if(!list.classList.contains('hide')) {
                    list.classList.add('hide');
                }
            });
        })
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

        if(element.getAttribute('data-state') === 'non-initialized') {
            deleteElement(element);
        } else if(element.getAttribute('data-state') === 'initialized') {
            finishedBlock.classList.remove('hide');
        }

        namingBlock.classList.add('hide'); 
    }
    function setElementName(element, nameInput, finishedBlock, namingBlock) {
        let title = nameInput.value;
        let titleEl = finishedBlock.querySelector('.title');
        let newElementProps = {
            parent: element.querySelector('.main'),
            dataValue: 'non-initialized',
            colors: cardColors
        };

        titleEl.textContent = title;
        namingBlock.classList.add('hide');
        finishedBlock.classList.remove('hide');

        nameInput.value = '';

        if(element.getAttribute('data-state') === 'non-initialized') {
            element.setAttribute('data-state', 'initialized');

            if(element.classList.contains('column')) {
                element.querySelector('[data-create="card"]').classList.remove('hide');
                createBtnSetEvent(setCard,  element, newElementProps);
                //createColumn();
                //createCard(element);
            } else if(element.classList.contains('card')) {
                //createCard(element.parentNode.parentNode);
            }
        } 

    }
    function deleteElement(element) { 
        element.remove();
    }



};

export default boardsManager;
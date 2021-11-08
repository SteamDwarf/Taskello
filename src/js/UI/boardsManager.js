import {setHolderDragnDrop, setItemDragnDrop} from './dragnDropEvents';
import { compose, curry, trace, querySelector, dataIdSet } from '../utils';
import { addNewBoard } from './boardList';
import { setFile } from '../Board';
import modals from './modals';


const boardsManager = () => {
    //const mainBoardEl = document.querySelector('.main-board');
    const centralBlock = document.querySelector('.central-block');
    const boardHolder = document.querySelector('.board-holder');
    const currentBoardTitle = document.querySelector('.board-name');


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

    const createElement = curry((innerHTML, elClass, parent) => {
        let element = document.createElement('div');

        element.innerHTML = innerHTML;
        element.classList.add(elClass);
        element.setAttribute('data-state', 'non-initialized');

        parent.append(element);

        return element;
    });

    const setElementColor = curry((colors, element) =>{
        let colorInd = Math.floor(Math.random() * colors.length);
        let color = colors[colorInd];
        
        element.classList.add(color);

        return element;
    });

    /**
     @description Функция привязывает к кнопке создание определенно элемента
     @param func - функция, создающая определенный элемент
     @param parent - элемент родитель, в который добавится созданный элемент
     @param btnHandler - элемент в котором находится кнопка создания
    */
    const createBtnSetEvent = curry((func, parent, btnHandler) => {
        const createBtn = btnHandler.querySelector('.create_btn');

        if(parent == null) {
            createBtn.addEventListener('click', () => func(querySelector('.holder', btnHandler)));
        } else {
            createBtn.addEventListener('click', () => func(parent));
        }

    });

    const openBoard = curry((boards, boardID) => {
        boardHolder.innerHTML = '';
        boards.forEach(board => {
            if(board.id == boardID) {
                currentBoard = board.boardEl;
                currentBoardTitle.textContent = board.title;
            }
        });
        boardHolder.append(currentBoard);
    });
    const unsetCurrentBoard = curry((currentBoard) => {
        let parent;

        if(!currentBoard) {
            return centralBlock;
        }

        parent  = currentBoard.parentNode;
        currentBoard.remove();
        return parent;
    });

    const createColumn = compose(
        setElementEditables, 
        setHolderDragnDrop('.card'), 
        createElement(columnElementInner, 'column')
    );
    const createCard = compose(
        setElementEditables, 
        setItemDragnDrop, 
        setElementColor(cardColors), 
        createElement(cardElementInner, 'card')
    );

/*     const createBoard = compose(

        createBtnSetEvent(createColumn, null),
        setBoard,
        dataIdSet(Date.now()),
        createElement(boardInner, 'board'),
        unsetCurrentBoard
    ); */

    let currentBoard;
    let boards = [];

    function createBoard(modal) {
        let title = modal.querySelector('input').value;
        let parent = boardHolder;
        let board;
        let boardObj = {};
        

        currentBoardTitle.textContent = title;
        boardHolder.innerHTML = '';

        
        board =  createElement(boardInner, 'board', parent);
        boardObj.boardEl = board;
        boardObj.id = Date.now();
        boardObj.title = title;
        currentBoard = boardObj.boardEl;
        boards.push(boardObj);

        addNewBoard(boardObj.id, title, openBoard(boards));
        createBtnSetEvent(createColumn, null, board);
    }
    



    //createBoard(centralBlock);

    modals('#create-board-btn', '.modal', '.modal_close', '#create-board_btn', createBoard);
    

    function setElementEditables(element) {
        const elementNamingBlock = element.querySelector('.naming-block');
        const elementOptionsList = element.querySelector('.options-list');
        const cancelBtn = element.querySelector('.cancel-btn');
        const confirmBtn = element.querySelector('.confirm-btn');
        const elementFinishedBlock = element.querySelector('.finished-block');
        const elementNameInput = element.querySelector('.name_input');
        const elementOptionsBtn = element.querySelector('.options-btn');
        const renameBtn = element.querySelector('[data-action="rename"]');
        const deleteBtn = element.querySelector('[data-action="delete"]');

        cancelBtn.addEventListener('click', () => cancelNaming(element));
        confirmBtn.addEventListener('click', () => setElementName(element, elementNameInput, elementFinishedBlock, elementNamingBlock));
        elementOptionsBtn.addEventListener('click', () => {
            elementOptionsList.classList.toggle('hide');
        });
        renameBtn.addEventListener('click', () => showTitleBlock(element, elementFinishedBlock, elementNamingBlock, elementOptionsList));
        deleteBtn.addEventListener('click', () => deleteElement(element));
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

        titleEl.textContent = title;
        namingBlock.classList.add('hide');
        finishedBlock.classList.remove('hide');

        nameInput.value = '';

        if(element.getAttribute('data-state') === 'non-initialized') {
            element.setAttribute('data-state', 'initialized');

            if(element.classList.contains('column')) {
                element.querySelector('[data-create="card"]').classList.remove('hide');
                createBtnSetEvent(createCard, element.querySelector('.main'), element);
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
import {setHolderDragnDrop, setItemDragnDrop} from './dragnDropEvents';
import { compose, curry, trace, querySelector, dataSet, copyObject } from '../utils';
import { createElement, dataSetFromProps, setProp, replaceProp, 
        appendElement, replaceElement, getDataFromModal, setElementColor, 
        setElementTitle } from '../utilsWithProps';
import { addBoardInBoardList } from './boardList';
import { setFile } from '../Board';
import modals from './modals';


const boardsManager = (boardHolder, currentBoardTitle, cardColors, createBoardModal) => {
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
                <input type="text" class="name_input input" data-type="title">
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
            <input type="text" class="name_input input" data-type="title">
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
    
    const createColumn = createElement(columnElementInner, 'column', 'div');
    const createCard = createElement(cardElementInner, 'card', 'div');
    const createBoard = createElement(boardInner, 'board', 'div');
   
    const dataStateSet = dataSetFromProps('state');

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
    });

    const openBoard = curry((boards, boardID) => {
        boards.forEach(board => {
            if(board.id == boardID) {
                currentBoard = board.boardEl;
                currentBoardTitle.textContent = board.title;
                replaceElement({parent: boardHolder, domEl: board.domEl})
            }
        });
    });

    /**
     * @description Создает колонку, добавляет ее в DOM дерево, привзяывается всю необходимую обработку событий
     * @param props - объект с необходимыми параеметрами:
     *  @param dataValue - значение аттрибута data
     *  @param parent - родительский элемент, в который будет вставляться созданеный элемент
     */
    const setColumn = compose(
        setElementEditables,
        setHolderDragnDrop,
        setProp('dragItemSelector', '.card'),
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
        addBoardInBoardList(openBoard(boards)),
        setProp('parent', null),
        setElementTitle(currentBoardTitle),
        replaceElement,
        setProp('parent', boardHolder),
        copyObject(boards),
        createBoard,
        getDataFromModal
    );


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
        const titleInput = domEl.querySelector('input');

        titleInput.addEventListener('keydown', (e) => {
            if(e.keyCode === 13) {
                confirmBtn.click();
            }
        });
        cancelBtn.addEventListener('click', () => cancelNaming(domEl));
        confirmBtn.addEventListener('click', () => setElementName(domEl, elementNameInput, elementFinishedBlock, elementNamingBlock));
        elementOptionsBtn.addEventListener('click', () => {
            elementOptionsList.classList.toggle('hide');
        });
        renameBtn.addEventListener('click', () => showTitleBlock(domEl, elementFinishedBlock, elementNamingBlock, elementOptionsList));
        deleteBtn.addEventListener('click', () => deleteElement(domEl)); 
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
            } 
        } 

    }
    function deleteElement(element) { 
        element.remove();
    }

    createBoardModal(setBoard);
    
};

export default boardsManager;
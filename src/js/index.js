'use strict';

import '../style.css';
import toolsPanel from './UI/toolsPanel';
import modals from './UI/modals';
import panel from './UI/panel';
import boardsManager from './UI/boardsManager';
import {hideElementsByBodyClick} from './utils';

document.addEventListener('DOMContentLoaded', () => {
    const boardNameInput = document.querySelector('#board-name_input');
    const createBoardBtn = document.querySelector('[data-create="board"]');
    const modalCreateBoard = document.querySelector('[data-modal="create-board"]');
    const boardHolder = document.querySelector('.board-holder');
    const currentBoardTitle = document.querySelector('.board-name');

    const cardColors = ['green', 'red', 'purple', 'yellow'];

    createBoardBtn.addEventListener('click', () => {
        modalCreateBoard.classList.remove('hide');
    });
    document.body.addEventListener('click', (e) => {
        hideElementsByBodyClick(e.target, 'options-list', 'options-btn');
    });

/*     function setNewBoard() {
        let board = createBoard(boardNameInput.value);
        
        addNewBoard(board);
    } */

    /* modals('#create-board-btn', '.modal', '.modal_close', '#create-board_btn', setNewBoard); */
    panel('.left-sidebar', '.sidebar_hide-button', ['.board-list']);
    boardsManager(boardHolder, currentBoardTitle, cardColors, modals('#create-board-btn', '.modal', '.modal_close', '#create-board_btn'));
    /* columns(); */

    /* createBoard(boardNameInput.) */

});
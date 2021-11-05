'use strict';

import '../style.css';

import {createBoard} from './Board';
import {addNewBoard} from './UI/boardList';
import toolsPanel from './UI/toolsPanel';
import modals from './UI/modals';
import panel from './UI/panel';
import boardsManager from './UI/boardsManager';

document.addEventListener('DOMContentLoaded', () => {
    const boardNameInput = document.querySelector('#board-name_input');
    const createBoardBtn = document.querySelector('[data-create="board"]');
    const modalCreateBoard = document.querySelector('[data-modal="create-board"]');

    createBoardBtn.addEventListener('click', () => {
        modalCreateBoard.classList.remove('hide');
    });

    function setNewBoard() {
        let board = createBoard(boardNameInput.value);
        
        addNewBoard(board);
    }

    modals('#create-board-btn', '.modal', '.modal_close', '#create-board_btn', setNewBoard);
    panel('.left-sidebar', '.sidebar_hide-button', ['.board-list']);
    boardsManager();
    /* columns(); */

    /* createBoard(boardNameInput.) */

});
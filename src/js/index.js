'use strict';

import '../style.css';

import {createBoard} from './Board';
import {addNewBoard} from './UI/boardList';
import toolsPanel from './UI/toolsPanel';
import modals from './UI/modals';
import panel from './UI/panel';
import columns from './UI/columns';

document.addEventListener('DOMContentLoaded', () => {
    const boardNameInput = document.querySelector('#board-name_input');

    function setNewBoard() {
        let board = createBoard(boardNameInput.value);
        
        addNewBoard(board);
    }

    modals('#create-board-btn', '.modal', '.modal_close', '#create-board_btn', setNewBoard);
    panel('.left-sidebar', '.sidebar_hide-button', ['.board-list']);
    columns();

    /* createBoard(boardNameInput.) */

});
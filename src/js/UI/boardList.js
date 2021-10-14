import { openBoard } from "../Board";

const boardListElem = document.querySelector('.board-list');

let boards = [];

function setEventListeners() {
    boards.forEach(board => {
        board.listItem.addEventListener('click', () => {
            setItemActive(board);
        });
    });
}

function addNewBoard(board) {
    let boardEl = document.createElement('li');
    let boardObj = {};

    boardEl.textContent = `${board.id}. ${board.name}`;
    boardEl.classList.add('board-list_item');

    boardObj.id = board.id;
    boardObj.name = board.name;
    boardObj.listItem = boardEl;
    boards.push(boardObj);

    boardListElem.append(boardEl);
    setItemActive(boardObj);
    setEventListeners();
}
function setItemActive(choosedBoard) {
    boards.forEach(board => {
        board.listItem.classList.remove('active');
    });
    choosedBoard.listItem.classList.add('active');
    openBoard(choosedBoard.id);
}

export {addNewBoard, setItemActive};
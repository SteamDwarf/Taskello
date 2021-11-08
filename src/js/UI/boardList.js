import { openBoard } from "../Board";
import { dataIdSet, dataGet, curry } from "../utils";

const boardListElem = document.querySelector('.board-list');

let openBoardFunc;
let boards = [];

function setEventListeners() {
    boards.forEach(board => {
        board.listItem.addEventListener('click', () => {
            setItemActive(board);
            openBoardFunc(dataGet('id', board.listItem));
        });
    });
}

/* function addNewBoard(boardID, boardName, openBoardF) {
    let boardEl = document.createElement('li');
    let boardObj = {};

    boardEl.textContent = boardName;
    boardEl.classList.add('board-list_item');
    dataIdSet(boardID, boardEl);


    boardObj.id = boardID;
    boardObj.name = boardName;
    boardObj.listItem = boardEl;
    boards.push(boardObj);

    openBoardFunc = openBoardF;
    boardListElem.append(boardEl);
    setItemActive(boardObj);
    setEventListeners();
} */
const addNewBoard = curry((openBoardF, props) => {
    let boardEl = document.createElement('li');
    let boardObj = {};
    let {title: boardName, id: boardID} = props;
    
    boardEl.textContent = boardName;
    boardEl.classList.add('board-list_item');
    dataIdSet(boardID, boardEl);


    boardObj.id = boardID;
    boardObj.name = boardName;
    boardObj.listItem = boardEl;
    boards.push(boardObj);

    openBoardFunc = openBoardF;
    boardListElem.append(boardEl);
    setItemActive(boardObj);
    setEventListeners();

    return props;
});
function setItemActive(choosedBoard) {
    boards.forEach(board => {
        board.listItem.classList.remove('active');
    });
    choosedBoard.listItem.classList.add('active');
    //openBoard(choosedBoard.id);
}

export {addNewBoard, setItemActive};
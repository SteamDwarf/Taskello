let boardsData = [];
let currentBoardId;

function createBoard(name) {
    let board = {
        name
    };

    if(boardsData.length === 0) {
        board.id = 0;
    } else {
        board.id = ++boardsData[boardsData.length - 1].id;
    }
    currentBoardId = board.id;

    boardsData.push(board);
    return board;
}
function openBoard(id) {
    currentBoardId = id;
    console.log(currentBoardId);
}
function addColumn(column) {
    console.log(column);
}

export {createBoard, openBoard, addColumn};
function toolsPanel() {
    const createBoardBtn = document.querySelector('#create-board-btn');
    const modalCreateBoard = document.querySelector('[data-modal="create-board"]');

    createBoardBtn.addEventListener('click', () => {
        modalCreateBoard.classList.remove('hide');
    });
}

export default toolsPanel;
const card = (column) => {
    const cardColors = ['green', 'red', 'purple', 'yellow'];
    const cardElement = `
        <div class="card-create_btn">
            <h4 class="card_title">Создать карточку</h4>
            <span>+</span>
        </div>
        <div class="card_naming-block hide">
            <input type="text" class="card-name_input input">
            <div class="card_btn-block">
                <button class="cancel-btn btn">Отмена</button>
                <button class="confirm-btn btn">Подтвердить</button>
            </div>
        </div>
        <div class="card_main hide">
            <div class="card_text"></div>
            <div class="card_options-btn">&#8942;</div>
            <ul class="card_options-list hide">
                <li class="card_option-element" data-action="rename">Переименовать</li>
                <li class="card_option-element" data-action="delete">Удалить</li>
            </ul>
        </div>
    `;

    let choosedItem;

    function setEventListeners(card) {
        const cardCreateBtn = card.querySelector('.card-create_btn');
        const cardNamingBlock = card.querySelector('.card_naming-block');
        const cardOptionsList = card.querySelector('.card_options-list');
        const cancelBtn = card.querySelector('.cancel-btn');
        const confirmBtn = card.querySelector('.confirm-btn');
        const cardNameInput = card.querySelector('.card-name_input');
        const cardMainBlock = card.querySelector('.card_main');
        const cardOptionsBtn = card.querySelector('.card_options-btn');
        const renameBtn = card.querySelector('[data-action="rename"]');
        const deleteBtn = card.querySelector('[data-action="delete"]');

        cardCreateBtn.addEventListener('click', () => showTitleBlock(cardCreateBtn, cardNamingBlock, cardOptionsList, true));
        cancelBtn.addEventListener('click', () => cancelNaming(card));
        confirmBtn.addEventListener('click', () => setCardName(cardNameInput, cardMainBlock, cardNamingBlock, card));
        cardOptionsBtn.addEventListener('click', () => {
            cardOptionsList.classList.toggle('hide');
        });
        renameBtn.addEventListener('click', () => showTitleBlock(cardMainBlock, cardNamingBlock, cardOptionsList));
        deleteBtn.addEventListener('click', () => deleteCard(card));

        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);

    }
    function showTitleBlock(oldBlock, namingBlock, optionsList, isCreate) {
        oldBlock.classList.add('hide');
        optionsList.classList.add('hide');
        namingBlock.classList.remove('hide');
        namingBlock.parentNode.classList.add('create');

        if(isCreate) {
            oldBlock.parentNode.parentNode.classList.toggle('created');
        }
    }
    function cancelNaming(card) {
        let cardCreateBtn = card.querySelector('.card-create_btn');
        let namingBlock = card.querySelector('.card_naming-block');
        let finishedBlock = card.querySelector('.card_main');

        if(cardCreateBtn) {
            cardCreateBtn.classList.remove('hide');
            card.classList.remove('create');
        } else {
            finishedBlock.classList.remove('hide');
        }
        
        namingBlock.classList.add('hide');
    }
    function setCardName(nameInput, finishedBlock, namingBlock, card) {
        let title = nameInput.value;
        let titleEl = finishedBlock.querySelector('.card_text');
        let colCreateBtn = finishedBlock.parentNode.parentNode.querySelector('.card-create_btn');

        titleEl.textContent = title;
        namingBlock.classList.add('hide');
        finishedBlock.classList.remove('hide');

        nameInput.value = '';

        if(colCreateBtn) {
            createCard(card.parentNode);
            colCreateBtn.remove();
        }
    }

    function createCard() {
        let newCard = document.createElement('div');
        let colorInd = Math.floor(Math.random() * cardColors.length);
        let color = cardColors[colorInd];

        newCard.innerHTML = cardElement;
        newCard.classList.add('card');
        newCard.classList.add(color);
        newCard.setAttribute('draggable', 'true');

        column.append(newCard);
        setEventListeners(newCard);
    }
    function deleteCard(card) { 
        card.remove();
    }


    function dragStart(e) {
        choosedItem = e.target;
        e.target.classList.add('hold');
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }
    function dragEnd(e) {
        e.target.classList.remove('hold', 'hide');
        choosedItem = null;
    }

    createCard();
};

export default card;
const panel = (panelSelector, hidePanelBtnSelector, additionalSelectors) => {
    
    const panelElem = document.querySelector(panelSelector);
    const hidePanelBtn = document.querySelector(hidePanelBtnSelector);
    const panelTitle = panelElem.querySelector('.panel_title');
    const panelMain = panelElem.querySelector('.sidebar_main');
    const additionalElements = [];

    if(additionalSelectors) {
        additionalSelectors.forEach(selector => {
            additionalElements.push(document.querySelector(selector));
        });
    }
    
    hidePanelBtn.addEventListener('click', () => {
        panelElem.classList.toggle('hide');
        hidePanelBtn.classList.toggle('mirrored');
        panelMain.classList.toggle('hide');
        if(panelTitle) {
            panelTitle.classList.toggle('hide');
        }

        if(additionalElements.length > 0) {
            additionalElements.forEach(element => {
                element.classList.toggle('hide');
            });
        }
    });
};

export default panel;
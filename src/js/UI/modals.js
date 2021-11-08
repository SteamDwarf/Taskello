/*Данный модуль добавляет функционал модальным окнам
  Принимает в качестве параметров:
  1.Селектор кнопки вызова модального окна
  2.Селектор самого модального окна
  3.Класс елемента закрытия модального окна*/
const modals = (modalBtnSelector, modalElemSelector, modalCloseClass, submitBtnSelector, submitFunction) => {

    const modalBtn = document.querySelectorAll(modalBtnSelector);
    const modalElem = document.querySelector(modalElemSelector);
    const modalCloseBtn = document.querySelector(`${modalCloseClass} svg`);
    const submitBtn = document.querySelector(submitBtnSelector);
    const allModals = document.querySelectorAll('[data-modal]');
    const scrollWidth = calcScrollWidth();

    //Данная функция подсчитывает ширину полосы прокрутки
    function calcScrollWidth() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }
    function modalClear() {
        const inputs = document.querySelectorAll('input');

        if(inputs.length > 0) {
            inputs.forEach(input => {
                input.value = '';
            });
        }
    }

    /*Функция закрытия модального окна, которая срабатывает при нажатии на подложку
        или при нажатии на закрывающий крестик*/
    function modalClose(e) {
        if(!e) {
            modalElem.classList.add('hide');
            modalClear();
            return;
        }
        if (e.target === modalElem || e.target === modalCloseBtn || e.target === modalCloseBtn.parentNode) {
            modalElem.classList.add('hide');
            modalClear();
        }
    }
    /*Функция открытия модального окна, при котором предусматривается сдвиг тела сайта
        из-за скрытия скрола*/
    function modalOpen() {
        modalElem.classList.remove('hide');
    }

    /*На каждую кнопку вызова модального окна навешивается событие нажатия ЛКМ*/
    modalBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
                allModals.forEach(modal => {
                    modal.style.cssText = 'display: hide';
                });
                modalOpen();
            }
        });
    });

    /*На подложку модального окна навешивается событие нажатия ЛКМ,
        при котором модальное окно будет закрываться*/
    modalElem.addEventListener('click', (e) => {
        modalClose(e);
    });
    submitBtn.addEventListener('click', (e) => {
        submitFunction({id: Date.now(), modal: e.target.parentNode});
        modalClose();
    });
};

export default modals;
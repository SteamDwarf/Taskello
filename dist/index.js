/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var _i = 0; _i < this.length; _i++) {\n        var id = this[_i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i2 = 0; _i2 < modules.length; _i2++) {\n      var item = [].concat(modules[_i2]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://tackello/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  }\n\n  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://tackello/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://tackello/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/js/Board.js":
/*!*************************!*\
  !*** ./src/js/Board.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setFile\": () => (/* binding */ setFile)\n/* harmony export */ });\nlet baseName = 'TaskelloDB';\nlet storeName = 'boards';\n\nfunction logerr(err) {\n  console.log(err);\n}\n\nfunction connectDB(f) {\n  let request = indexedDB.open(baseName, 1);\n  request.onerror = logerr;\n\n  request.onsuccess = function () {\n    f(request.result);\n  };\n\n  request.onupgradeneeded = function (e) {\n    e.currentTarget.result.createObjectStore(storeName, {\n      keyPath: \"id\"\n    });\n    connectDB(f);\n  };\n}\n\nfunction getFile(file, f) {\n  connectDB(function (db) {\n    var request = db.transaction([storeName], \"readonly\").objectStore(storeName).get(file);\n    request.onerror = logerr;\n\n    request.onsuccess = function () {\n      f(request.result ? request.result : -1);\n    };\n  });\n}\n\nfunction getStorage(f) {\n  connectDB(function (db) {\n    var rows = [],\n        store = db.transaction([storeName], \"readonly\").objectStore(storeName);\n    if (store.mozGetAll) store.mozGetAll().onsuccess = function (e) {\n      f(e.target.result);\n    };else store.openCursor().onsuccess = function (e) {\n      var cursor = e.target.result;\n\n      if (cursor) {\n        rows.push(cursor.value);\n        cursor.continue();\n      } else {\n        f(rows);\n      }\n    };\n  });\n}\n\nfunction setFile(file) {\n  connectDB(function (db) {\n    var request = db.transaction([storeName], \"readwrite\").objectStore(storeName).put(file);\n    request.onerror = logerr;\n\n    request.onsuccess = function () {\n      return request.result;\n    };\n  });\n}\n\nfunction delFile(file) {\n  connectDB(function (db) {\n    var request = db.transaction([storeName], \"readwrite\").objectStore(storeName).delete(file);\n    request.onerror = logerr;\n\n    request.onsuccess = function () {\n      console.log(\"File delete from DB:\", file);\n    };\n  });\n}\n\n\n/* let boardsData = [];\r\nlet currentBoardId;\r\n\r\nfunction createBoard(name) {\r\n    let board = {\r\n        name\r\n    };\r\n\r\n    if(boardsData.length === 0) {\r\n        board.id = 0;\r\n    } else {\r\n        board.id = ++boardsData[boardsData.length - 1].id;\r\n    }\r\n    currentBoardId = board.id;\r\n\r\n    boardsData.push(board);\r\n    return board;\r\n}\r\nfunction openBoard(id) {\r\n    currentBoardId = id;\r\n    console.log(currentBoardId);\r\n}\r\nfunction addColumn(column) {\r\n    console.log(column);\r\n}\r\nfunction renameColumn(id, title) {\r\n    console.log('id:' + id);\r\n    console.log('title:' + title);\r\n}\r\n\r\nexport {createBoard, openBoard, addColumn, renameColumn}; */\n\n//# sourceURL=webpack://tackello/./src/js/Board.js?");

/***/ }),

/***/ "./src/js/UI/boardList.js":
/*!********************************!*\
  !*** ./src/js/UI/boardList.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addNewBoard\": () => (/* binding */ addNewBoard),\n/* harmony export */   \"setItemActive\": () => (/* binding */ setItemActive)\n/* harmony export */ });\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Board */ \"./src/js/Board.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n\n\nconst boardListElem = document.querySelector('.board-list');\nlet openBoardFunc;\nlet boards = [];\n\nfunction setEventListeners() {\n  boards.forEach(board => {\n    board.listItem.addEventListener('click', () => {\n      setItemActive(board);\n      openBoardFunc((0,_utils__WEBPACK_IMPORTED_MODULE_1__.dataGet)('id', board.listItem));\n    });\n  });\n}\n/* function addNewBoard(boardID, boardName, openBoardF) {\r\n    let boardEl = document.createElement('li');\r\n    let boardObj = {};\r\n\r\n    boardEl.textContent = boardName;\r\n    boardEl.classList.add('board-list_item');\r\n    dataIdSet(boardID, boardEl);\r\n\r\n\r\n    boardObj.id = boardID;\r\n    boardObj.name = boardName;\r\n    boardObj.listItem = boardEl;\r\n    boards.push(boardObj);\r\n\r\n    openBoardFunc = openBoardF;\r\n    boardListElem.append(boardEl);\r\n    setItemActive(boardObj);\r\n    setEventListeners();\r\n} */\n\n\nconst addNewBoard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.curry)((openBoardF, props) => {\n  let boardEl = document.createElement('li');\n  let boardObj = {};\n  let {\n    title: boardName,\n    id: boardID\n  } = props;\n  boardEl.textContent = boardName;\n  boardEl.classList.add('board-list_item');\n  (0,_utils__WEBPACK_IMPORTED_MODULE_1__.dataIdSet)(boardID, boardEl);\n  boardObj.id = boardID;\n  boardObj.name = boardName;\n  boardObj.listItem = boardEl;\n  boards.push(boardObj);\n  openBoardFunc = openBoardF;\n  boardListElem.append(boardEl);\n  setItemActive(boardObj);\n  setEventListeners();\n  return props;\n});\n\nfunction setItemActive(choosedBoard) {\n  boards.forEach(board => {\n    board.listItem.classList.remove('active');\n  });\n  choosedBoard.listItem.classList.add('active'); //openBoard(choosedBoard.id);\n}\n\n\n\n//# sourceURL=webpack://tackello/./src/js/UI/boardList.js?");

/***/ }),

/***/ "./src/js/UI/boardsManager.js":
/*!************************************!*\
  !*** ./src/js/UI/boardsManager.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dragnDropEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dragnDropEvents */ \"./src/js/UI/dragnDropEvents.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n/* harmony import */ var _boardList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boardList */ \"./src/js/UI/boardList.js\");\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Board */ \"./src/js/Board.js\");\n/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modals */ \"./src/js/UI/modals.js\");\n\n\n\n\n\n\nconst boardsManager = (boardHolder, currentBoardTitle, cardColors) => {\n  let currentBoard;\n  let boards = [];\n  const boardInner = `\n        <main class=\"board_main holder\"> </main>\n        <div class=\"create_btn\" data-create=\"column\">\n            <h4 class=\"title\">Создать колонку</h4>\n            <span>+</span>\n        </div>\n    `;\n  const columnElementInner = `\n        <header class=\"header flex-column\">           \n            <div class=\"naming-block\">\n                <input type=\"text\" class=\"name_input input\">\n                <div class=\"btn-block\">\n                    <button class=\"cancel-btn btn\">Отмена</button>\n                    <button class=\"confirm-btn btn\">Подтвердить</button>\n                </div>\n            </div>\n            <div class=\"finished-block hide\">\n                <h4 class=\"title column_title\"></h4>\n                <div class=\"options-btn\">&#8942;</div>\n                <ul class=\"options-list hide\">\n                    <li class=\"option-element\" data-action=\"rename\">Переименовать</li>\n                    <li class=\"option-element\" data-action=\"delete\">Удалить</li>\n                </ul>\n            </div>\n        </header>\n        <div class=\"main\">\n        </div>\n        <div class=\"create_btn create_card hide\" data-create=\"card\">\n            <h4 class=\"title\">Создать карточку</h4>\n            <span>+</span>\n        </div>\n    `;\n  const cardElementInner = `\n        <div class=\"naming-block\">\n            <input type=\"text\" class=\"name_input input\">\n            <div class=\"btn-block\">\n                <button class=\"cancel-btn btn\">Отмена</button>\n                <button class=\"confirm-btn btn\">Подтвердить</button>\n            </div>\n        </div>\n        <div class=\"finished-block hide\">\n            <div class=\"title\"></div>\n            <div class=\"options-btn\">&#8942;</div>\n            <ul class=\"options-list hide\">\n                <li class=\"option-element\" data-action=\"rename\">Переименовать</li>\n                <li class=\"option-element\" data-action=\"delete\">Удалить</li>\n            </ul>\n        </div>\n    `;\n  const createElement = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.curry)((innerHTML, elClass, tag, props) => {\n    let element = document.createElement(tag);\n    element.innerHTML = innerHTML;\n    element.classList.add(elClass);\n    props.domEl = element;\n    return props;\n  });\n  const createColumn = createElement(columnElementInner, 'column', 'div');\n  const createCard = createElement(cardElementInner, 'card', 'div');\n  const createBoard = createElement(boardInner, 'board', 'div');\n  const dataSetElement = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.curry)((dataName, props) => {\n    let {\n      dataValue,\n      domEl\n    } = props;\n    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.dataSet)(dataName, dataValue, domEl);\n    return props;\n  });\n  const dataStateSet = dataSetElement('state');\n  const dataIDSet = dataSetElement('id');\n  const setProp = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.curry)((propKey, propValue, props) => {\n    props[propKey] = propValue;\n    return props;\n  });\n  const replaceProp = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.curry)((srcProp, distProp, props) => {\n    props[distProp] = props[srcProp];\n    return props;\n  });\n  const copyObject = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.curry)((savingArray, srcObject) => {\n    let distObject = {};\n    Object.assign(distObject, srcObject);\n\n    if (savingArray) {\n      savingArray.push(distObject);\n    }\n\n    return srcObject;\n  });\n\n  const appendElement = props => {\n    let {\n      parent,\n      domEl\n    } = props;\n    parent.append(domEl);\n    return props;\n  };\n\n  const replaceElement = props => {\n    let {\n      parent,\n      domEl\n    } = props;\n    parent.innerHTML = '';\n    parent.append(domEl);\n    return props;\n  };\n\n  const getDataFromModal = props => {\n    props.title = props.modal.querySelector('input').value;\n    return props;\n  };\n\n  const setElementTitle = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.curry)((titleBlock, props) => {\n    let {\n      title\n    } = props;\n    titleBlock.textContent = title;\n    return props;\n  });\n  const setElementColor = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.curry)(props => {\n    let {\n      colors,\n      domEl\n    } = props;\n    let colorInd = Math.floor(Math.random() * colors.length);\n    let color = colors[colorInd];\n    domEl.classList.add(color);\n    return props;\n  });\n  /**\r\n   @description Функция привязывает к кнопке создание определенно элемента\r\n   @param func - функция, создающая определенный элемент\r\n   @param parent - элемент родитель, в который добавится созданный элемент\r\n   @param btnHandler - элемент в котором находится кнопка создания\r\n  */\n\n  const createBtnSetEvent = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.curry)((func, btnHandler, props) => {\n    let createBtn;\n    let {\n      parent\n    } = props;\n\n    if (btnHandler) {\n      createBtn = btnHandler.querySelector('.create_btn');\n    } else {\n      createBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)('.create_btn', props.domEl);\n    }\n\n    if (parent == null) {\n      props.parent = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelector)('.holder', props.domEl);\n    }\n\n    createBtn.addEventListener('click', () => func(props));\n  });\n  const openBoard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.curry)((boards, boardID) => {\n    boards.forEach(board => {\n      if (board.id == boardID) {\n        currentBoard = board.boardEl;\n        currentBoardTitle.textContent = board.title;\n        replaceElement({\n          parent: boardHolder,\n          domEl: board.domEl\n        });\n      }\n    });\n  });\n  /**\r\n   * @description Создает колонку, добавляет ее в DOM дерево, привзяывается всю необходимую обработку событий\r\n   * @param props - объект с необходимыми параеметрами:\r\n   *  @param dataValue - значение аттрибута data\r\n   *  @param parent - родительский элемент, в который будет вставляться созданеный элемент\r\n   */\n\n  const setColumn = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.compose)(setElementEditables, _dragnDropEvents__WEBPACK_IMPORTED_MODULE_0__.setHolderDragnDrop, setProp('dragItemSelector', '.card'), appendElement, dataStateSet, createColumn, setProp('dataValue', 'non-initialized'));\n  const setCard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.compose)(setElementEditables, _dragnDropEvents__WEBPACK_IMPORTED_MODULE_0__.setItemDragnDrop, setElementColor, appendElement, dataStateSet, createCard);\n  const setBoard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.compose)(createBtnSetEvent(setColumn, null), (0,_boardList__WEBPACK_IMPORTED_MODULE_2__.addNewBoard)(openBoard(boards)), setProp('parent', null), setElementTitle(currentBoardTitle), replaceElement, setProp('parent', boardHolder), copyObject(boards), createBoard, getDataFromModal);\n\n  function setElementEditables(props) {\n    let {\n      domEl\n    } = props;\n    const elementNamingBlock = domEl.querySelector('.naming-block');\n    const elementOptionsList = domEl.querySelector('.options-list');\n    const cancelBtn = domEl.querySelector('.cancel-btn');\n    const confirmBtn = domEl.querySelector('.confirm-btn');\n    const elementFinishedBlock = domEl.querySelector('.finished-block');\n    const elementNameInput = domEl.querySelector('.name_input');\n    const elementOptionsBtn = domEl.querySelector('.options-btn');\n    const renameBtn = domEl.querySelector('[data-action=\"rename\"]');\n    const deleteBtn = domEl.querySelector('[data-action=\"delete\"]');\n    const titleInput = domEl.querySelector('input');\n    titleInput.addEventListener('keydown', e => {\n      if (e.keyCode === 13) {\n        confirmBtn.click();\n      }\n    });\n    cancelBtn.addEventListener('click', () => cancelNaming(domEl));\n    confirmBtn.addEventListener('click', () => setElementName(domEl, elementNameInput, elementFinishedBlock, elementNamingBlock));\n    elementOptionsBtn.addEventListener('click', () => {\n      elementOptionsList.classList.toggle('hide');\n    });\n    renameBtn.addEventListener('click', () => showTitleBlock(domEl, elementFinishedBlock, elementNamingBlock, elementOptionsList));\n    deleteBtn.addEventListener('click', () => deleteElement(domEl));\n    domEl.addEventListener('click', e => {\n      if (e.target.classList.contains('options-btn')) {\n        return;\n      }\n\n      let optionsList = domEl.querySelectorAll('.options-list');\n      optionsList.forEach(list => {\n        if (!list.classList.contains('hide')) {\n          list.classList.add('hide');\n        }\n      });\n    });\n  }\n\n  function showTitleBlock(element, oldBlock, namingBlock, optionsList, isCreate) {\n    oldBlock.classList.add('hide');\n    optionsList.classList.add('hide');\n    namingBlock.classList.remove('hide');\n\n    if (isCreate) {\n      element.classList.toggle('created');\n    }\n  }\n\n  function cancelNaming(element) {\n    let namingBlock = element.querySelector('.naming-block');\n    let finishedBlock = element.querySelector('.finished-block');\n\n    if (element.getAttribute('data-state') === 'non-initialized') {\n      deleteElement(element);\n    } else if (element.getAttribute('data-state') === 'initialized') {\n      finishedBlock.classList.remove('hide');\n    }\n\n    namingBlock.classList.add('hide');\n  }\n\n  function setElementName(element, nameInput, finishedBlock, namingBlock) {\n    let title = nameInput.value;\n    let titleEl = finishedBlock.querySelector('.title');\n    let newElementProps = {\n      parent: element.querySelector('.main'),\n      dataValue: 'non-initialized',\n      colors: cardColors\n    };\n    titleEl.textContent = title;\n    namingBlock.classList.add('hide');\n    finishedBlock.classList.remove('hide');\n    nameInput.value = '';\n\n    if (element.getAttribute('data-state') === 'non-initialized') {\n      element.setAttribute('data-state', 'initialized');\n\n      if (element.classList.contains('column')) {\n        element.querySelector('[data-create=\"card\"]').classList.remove('hide');\n        createBtnSetEvent(setCard, element, newElementProps); //createColumn();\n        //createCard(element);\n      } else if (element.classList.contains('card')) {//createCard(element.parentNode.parentNode);\n      }\n    }\n  }\n\n  function deleteElement(element) {\n    element.remove();\n  }\n\n  (0,_modals__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('#create-board-btn', '.modal', '.modal_close', '#create-board_btn', setBoard);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (boardsManager);\n\n//# sourceURL=webpack://tackello/./src/js/UI/boardsManager.js?");

/***/ }),

/***/ "./src/js/UI/dragnDropEvents.js":
/*!**************************************!*\
  !*** ./src/js/UI/dragnDropEvents.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setHolderDragnDrop\": () => (/* binding */ setHolderDragnDrop),\n/* harmony export */   \"setItemDragnDrop\": () => (/* binding */ setItemDragnDrop)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n\nlet choosedItem;\nconst setHolderDragnDrop = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.curry)(props => {\n  let {\n    domEl,\n    dragItemSelector\n  } = props;\n  domEl.addEventListener('dragover', e => dragOver(e, domEl.querySelector('.main'), dragItemSelector));\n  domEl.addEventListener('drop', e => drop(e, domEl, dragItemSelector));\n  return props;\n});\n\nfunction setItemDragnDrop(props) {\n  let {\n    domEl\n  } = props;\n  domEl.setAttribute('draggable', 'true');\n  domEl.addEventListener('dragstart', e => dragStart(e, domEl));\n  domEl.addEventListener('dragend', dragEnd);\n  return props;\n}\n\nfunction dragStart(e, item) {\n  choosedItem = item;\n  e.target.classList.add('hold');\n}\n\nfunction dragEnd(e) {\n  e.target.classList.remove('hold');\n  choosedItem = null;\n}\n\nfunction dragOver(e, holder, dragItemSelector) {\n  e.preventDefault();\n  let afterElement;\n\n  if (!choosedItem) {\n    return;\n  }\n\n  afterElement = getDragAfterElement(holder, dragItemSelector, e.clientY);\n\n  if (!afterElement) {\n    holder.append(choosedItem);\n  } else {\n    afterElement.before(choosedItem);\n  }\n}\n\nfunction drop(e, holder, dragItemClass) {\n  /* let curElement;\r\n    if(dragItemClass === '.column') {\r\n      curElement = holder.querySelector(dragItemClass);\r\n      choosedItem.parentNode.append(curElement);\r\n      holder.append(choosedItem);\r\n      holder.classList.remove('over');\r\n  } else if(dragItemClass === '.card') {\r\n      holder.append(choosedItem);\r\n      holder.classList.remove('over');\r\n  } */\n}\n\nfunction getDragAfterElement(holder, dragItemSelector, y) {\n  const draggableItems = [...holder.querySelectorAll(`${dragItemSelector}:not(.hold)`)];\n  let afterElement;\n  afterElement = draggableItems.reduce((prevItem, curItem) => {\n    const box = curItem.getBoundingClientRect();\n    const offset = y - box.top - box.height / 2;\n\n    if (offset < 0 && offset > prevItem.offset) {\n      return {\n        offset: offset,\n        element: curItem\n      };\n    } else {\n      return prevItem;\n    }\n  }, {\n    offset: Number.NEGATIVE_INFINITY\n  }).element;\n  return afterElement;\n}\n\n\n\n//# sourceURL=webpack://tackello/./src/js/UI/dragnDropEvents.js?");

/***/ }),

/***/ "./src/js/UI/modals.js":
/*!*****************************!*\
  !*** ./src/js/UI/modals.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/*Данный модуль добавляет функционал модальным окнам\r\n  Принимает в качестве параметров:\r\n  1.Селектор кнопки вызова модального окна\r\n  2.Селектор самого модального окна\r\n  3.Класс елемента закрытия модального окна*/\nconst modals = (modalBtnSelector, modalElemSelector, modalCloseClass, submitBtnSelector, submitFunction) => {\n  const modalBtn = document.querySelectorAll(modalBtnSelector);\n  const modalElem = document.querySelector(modalElemSelector);\n  const modalCloseBtn = document.querySelector(`${modalCloseClass} svg`);\n  const submitBtn = document.querySelector(submitBtnSelector);\n  const allModals = document.querySelectorAll('[data-modal]');\n  const scrollWidth = calcScrollWidth(); //Данная функция подсчитывает ширину полосы прокрутки\n\n  function calcScrollWidth() {\n    let div = document.createElement('div');\n    div.style.width = '50px';\n    div.style.height = '50px';\n    div.style.overflowY = 'scroll';\n    div.style.visibility = 'hidden';\n    document.body.append(div);\n    let scrollWidth = div.offsetWidth - div.clientWidth;\n    div.remove();\n    return scrollWidth;\n  }\n\n  function modalClear() {\n    const inputs = document.querySelectorAll('input');\n\n    if (inputs.length > 0) {\n      inputs.forEach(input => {\n        input.value = '';\n      });\n    }\n  }\n  /*Функция закрытия модального окна, которая срабатывает при нажатии на подложку\r\n      или при нажатии на закрывающий крестик*/\n\n\n  function modalClose(e) {\n    if (!e) {\n      modalElem.classList.add('hide');\n      modalClear();\n      return;\n    }\n\n    if (e.target === modalElem || e.target === modalCloseBtn || e.target === modalCloseBtn.parentNode) {\n      modalElem.classList.add('hide');\n      modalClear();\n    }\n  }\n  /*Функция открытия модального окна, при котором предусматривается сдвиг тела сайта\r\n      из-за скрытия скрола*/\n\n\n  function modalOpen() {\n    modalElem.classList.remove('hide');\n  }\n  /*На каждую кнопку вызова модального окна навешивается событие нажатия ЛКМ*/\n\n\n  modalBtn.forEach(btn => {\n    btn.addEventListener('click', e => {\n      if (e.target) {\n        e.preventDefault();\n        allModals.forEach(modal => {\n          modal.style.cssText = 'display: hide';\n        });\n        modalOpen();\n      }\n    });\n  });\n  /*На подложку модального окна навешивается событие нажатия ЛКМ,\r\n      при котором модальное окно будет закрываться*/\n\n  modalElem.addEventListener('click', e => {\n    modalClose(e);\n  });\n  modalElem.addEventListener('submit', e => {\n    e.preventDefault();\n    submitFunction({\n      id: Date.now(),\n      modal: modalElem\n    });\n    modalClose();\n  });\n  /* submitBtn.addEventListener('click', (e) => {\r\n      submitFunction({id: Date.now(), modal: e.target.parentNode});\r\n      modalClose();\r\n  }); */\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);\n\n//# sourceURL=webpack://tackello/./src/js/UI/modals.js?");

/***/ }),

/***/ "./src/js/UI/panel.js":
/*!****************************!*\
  !*** ./src/js/UI/panel.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst panel = (panelSelector, hidePanelBtnSelector, additionalSelectors) => {\n  const panelElem = document.querySelector(panelSelector);\n  const hidePanelBtn = document.querySelector(hidePanelBtnSelector);\n  const panelTitle = panelElem.querySelector('.panel_title');\n  const panelMain = panelElem.querySelector('.sidebar_main');\n  const additionalElements = [];\n\n  if (additionalSelectors) {\n    additionalSelectors.forEach(selector => {\n      additionalElements.push(document.querySelector(selector));\n    });\n  }\n\n  hidePanelBtn.addEventListener('click', () => {\n    panelElem.classList.toggle('hide');\n    hidePanelBtn.classList.toggle('mirrored');\n    panelMain.classList.toggle('hide');\n\n    if (panelTitle) {\n      panelTitle.classList.toggle('hide');\n    }\n\n    if (additionalElements.length > 0) {\n      additionalElements.forEach(element => {\n        element.classList.toggle('hide');\n      });\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (panel);\n\n//# sourceURL=webpack://tackello/./src/js/UI/panel.js?");

/***/ }),

/***/ "./src/js/UI/toolsPanel.js":
/*!*********************************!*\
  !*** ./src/js/UI/toolsPanel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction toolsPanel() {\n  const createBoardBtn = document.querySelector('#create-board-btn');\n  const modalCreateBoard = document.querySelector('[data-modal=\"create-board\"]');\n  createBoardBtn.addEventListener('click', () => {\n    modalCreateBoard.classList.remove('hide');\n  });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toolsPanel);\n\n//# sourceURL=webpack://tackello/./src/js/UI/toolsPanel.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style.css */ \"./src/style.css\");\n/* harmony import */ var _UI_boardList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/boardList */ \"./src/js/UI/boardList.js\");\n/* harmony import */ var _UI_toolsPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI/toolsPanel */ \"./src/js/UI/toolsPanel.js\");\n/* harmony import */ var _UI_modals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/modals */ \"./src/js/UI/modals.js\");\n/* harmony import */ var _UI_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UI/panel */ \"./src/js/UI/panel.js\");\n/* harmony import */ var _UI_boardsManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UI/boardsManager */ \"./src/js/UI/boardsManager.js\");\n\n\n //import {createBoard} from './Board';\n\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const boardNameInput = document.querySelector('#board-name_input');\n  const createBoardBtn = document.querySelector('[data-create=\"board\"]');\n  const modalCreateBoard = document.querySelector('[data-modal=\"create-board\"]');\n  const boardHolder = document.querySelector('.board-holder');\n  const currentBoardTitle = document.querySelector('.board-name');\n  const cardColors = ['green', 'red', 'purple', 'yellow'];\n  createBoardBtn.addEventListener('click', () => {\n    modalCreateBoard.classList.remove('hide');\n  });\n\n  function setNewBoard() {\n    let board = createBoard(boardNameInput.value);\n    (0,_UI_boardList__WEBPACK_IMPORTED_MODULE_1__.addNewBoard)(board);\n  }\n  /* modals('#create-board-btn', '.modal', '.modal_close', '#create-board_btn', setNewBoard); */\n\n\n  (0,_UI_panel__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('.left-sidebar', '.sidebar_hide-button', ['.board-list']);\n  (0,_UI_boardsManager__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(boardHolder, currentBoardTitle, cardColors);\n  /* columns(); */\n\n  /* createBoard(boardNameInput.) */\n});\n\n//# sourceURL=webpack://tackello/./src/js/index.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"compose\": () => (/* binding */ compose),\n/* harmony export */   \"curry\": () => (/* binding */ curry),\n/* harmony export */   \"trace\": () => (/* binding */ trace),\n/* harmony export */   \"querySelector\": () => (/* binding */ querySelector),\n/* harmony export */   \"dataIdSet\": () => (/* binding */ dataIdSet),\n/* harmony export */   \"dataSet\": () => (/* binding */ dataSet),\n/* harmony export */   \"dataGet\": () => (/* binding */ dataGet)\n/* harmony export */ });\n/**\r\n * @description Последовательно выполняет все переданные функции, начиная с последней. \r\n *              Последующая функция принимают значение, возвращаемое предыдущей функцией.\r\n * @param fns - функции \r\n */\nconst compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];\n/**\r\n * @description \r\n * @param  fn - функция\r\n * @returns \r\n */\n\n\nconst curry = fn => {\n  const arity = fn.length;\n  return function $curry(...args) {\n    if (args.length < arity) {\n      return $curry.bind(null, ...args);\n    }\n\n    return fn.call(null, ...args);\n  };\n};\n\nconst trace = curry((tag, x) => {\n  console.log(tag, x);\n  return x;\n});\n\nconst querySelector = (selector, element) => {\n  return element.querySelector(selector);\n};\n\nconst append = curry((parent, element) => {\n  parent.append(element);\n  return element;\n});\n\nconst dataGet = (dataName, element) => {\n  return element.dataset[dataName];\n};\n\nconst dataSet = curry((dataName, dataValue, element) => {\n  element.dataset[dataName] = dataValue;\n  return element;\n});\nconst dataIdSet = dataSet('id');\n\nconst getTail = el => {\n  return el[el.length - 1];\n};\n/* const memoize = (fn) => {\r\n    let cache = {};\r\n\r\n    return (...args) => {\r\n      let n = args[0];\r\n\r\n      if (n in cache) {\r\n        console.log('Fetching from cache');\r\n        return cache[n];\r\n      }\r\n      else {\r\n        console.log('Calculating result');\r\n        let result = fn(n);\r\n        cache[n] = result;\r\n        return result;\r\n      }\r\n    }\r\n} */\n\n/* const getElementAndParent = curry((selector, parent) => {\r\n    const element = parent.querySelector(selector);\r\n    return {element, parent}\r\n}); */\n\n\n\n\n//# sourceURL=webpack://tackello/./src/js/utils.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Roboto/Roboto-Regular.ttf */ \"./src/assets/fonts/Roboto/Roboto-Regular.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Roboto/Roboto-Bold.ttf */ \"./src/assets/fonts/Roboto/Roboto-Bold.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/Roboto/Roboto-Italic.ttf */ \"./src/assets/fonts/Roboto/Roboto-Italic.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\nvar ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);\nvar ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"@font-face {\\r\\n    font-family: 'Roboto';\\r\\n    src: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\r\\n    font-style: normal;\\r\\n    font-weight: normal;\\r\\n}\\r\\n@font-face {\\r\\n    font-family: 'Roboto';\\r\\n    src: url(\" + ___CSS_LOADER_URL_REPLACEMENT_1___ + \");\\r\\n    font-style: normal;\\r\\n    font-weight: bold;\\r\\n}\\r\\n@font-face {\\r\\n    font-family: 'Roboto';\\r\\n    src: url(\" + ___CSS_LOADER_URL_REPLACEMENT_2___ + \");\\r\\n    font-style: italic;\\r\\n    font-weight: normal;\\r\\n}\\r\\n\\r\\n* {\\r\\n    padding: 0;\\r\\n    margin: 0;\\r\\n    box-sizing: border-box;\\r\\n}\\r\\nbody {\\r\\n    position: relative;\\r\\n    background-color: #16222D;\\r\\n    color: #D3DAE1;\\r\\n    font-size: 16px;\\r\\n    font-family: 'Roboto', sans-serif;\\r\\n}\\r\\n\\r\\n/*Общие стили*/\\r\\n.input {\\r\\n    margin: 0 auto;\\r\\n    padding: 10px;\\r\\n    border: 1px solid #4d88ff;\\r\\n    border-radius: 10px;\\r\\n    color: #D3DAE1;\\r\\n    font-size: 16px;\\r\\n    outline: none;\\r\\n    background-color: rgba(0, 0, 0, 0.2);\\r\\n}\\r\\n.btn {\\r\\n    padding: 5px;\\r\\n    color: #D3DAE1;\\r\\n    cursor: pointer;\\r\\n    transition: background-color 0.3s;\\r\\n}\\r\\n.cancel-btn {\\r\\n    border: 1px solid #E12C2C;\\r\\n    background-color: rgba(225, 44, 44, 0.4);\\r\\n}\\r\\n.cancel-btn:hover {\\r\\n    background-color: #E12C2C;\\r\\n}\\r\\n.confirm-btn {\\r\\n    border: 1px solid #1AB334;\\r\\n    background-color: rgba(26, 179, 52, 0.4);\\r\\n}\\r\\n.confirm-btn:hover {\\r\\n    background-color: #1AB334;\\r\\n}\\r\\n\\r\\n/*Стили панелей*/\\r\\n.panel {\\r\\n    background-color: #1f2e3c;\\r\\n    border: 3px solid #6F8DA9;\\r\\n    border-radius: 5px;\\r\\n    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.5), inset -5px -5px 5px rgba(0, 0, 0, 0.5);\\r\\n}\\r\\n\\r\\n/*Стили боковых панелей*/\\r\\n.sidebar_header {\\r\\n    display: flex;\\r\\n    align-items: center;\\r\\n    justify-content: space-between;\\r\\n    text-align: center;\\r\\n    background-color: rgba(110, 178, 236, 0.2);\\r\\n    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);\\r\\n    padding: 15px 10px;\\r\\n}\\r\\n.sidebar_title {\\r\\n    margin-left: 25px;\\r\\n}\\r\\n.sidebar_hide-button svg {\\r\\n    width: 20px;\\r\\n    height: 20px;\\r\\n    fill: #D3DAE1;\\r\\n}\\r\\n\\r\\n/*Стили \\\"кнопок-инструментов\\\"*/\\r\\n.tools-button {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    justify-content: space-around;\\r\\n    align-items: center;\\r\\n    width: 120px;\\r\\n    height: 80%;\\r\\n    margin-left: 20px;\\r\\n    border: none;\\r\\n    border-radius: 10px;\\r\\n    color: #D3DAE1;\\r\\n    background-color: rgba(255, 255, 255, 0.2);\\r\\n    cursor: pointer;\\r\\n    transition: background-color 0.2s;\\r\\n}\\r\\n.tools-button:hover {\\r\\n    background-color: rgba(15, 107, 160, 0.5)\\r\\n}\\r\\n.tools-button svg {\\r\\n    width: 30px;\\r\\n    height: 30px;\\r\\n    fill: #D3DAE1;\\r\\n}\\r\\n\\r\\n/*Стили модпльного окна*/\\r\\n.modal {\\r\\n    display: flex;\\r\\n    align-items: center;\\r\\n    position: absolute;\\r\\n    top: 0;\\r\\n    width: 100%;\\r\\n    height: 100vh;\\r\\n    background-color: rgba(0, 0, 0, 0.5)\\r\\n}\\r\\n.modal_content {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    justify-content: space-around;\\r\\n    position: relative;\\r\\n    width: 400px;\\r\\n    height: 200px;\\r\\n    margin: 0 auto;\\r\\n    background-color: #1F3344;\\r\\n    border-radius: 10px;\\r\\n}\\r\\n.modal_header {\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n    padding: 0 15px 10px;\\r\\n    border-bottom: 1px solid rgba(110, 178, 236, 0.4);\\r\\n    text-align: center;\\r\\n}\\r\\n.modal_close {\\r\\n    padding: 10px;\\r\\n    cursor: pointer;\\r\\n}\\r\\n.modal_close svg {\\r\\n    width: 15px;\\r\\n    height: 15px;\\r\\n    fill: #D3DAE1;\\r\\n}\\r\\n.modal_input {\\r\\n    width: 80%;\\r\\n}\\r\\n.modal_btn {\\r\\n    width: 100px;\\r\\n    height: 40px;\\r\\n    margin: 0 auto;\\r\\n    border: 1px solid #5A2383;\\r\\n    color: #D3DAE1;\\r\\n    background-color: rgba(85, 26, 129, 0.2);\\r\\n    cursor: pointer;\\r\\n    transition: background-color 0.3s;\\r\\n}\\r\\n.modal_btn:hover {\\r\\n    background-color: rgba(85, 26, 129, 0.6);\\r\\n}\\r\\n\\r\\n/*Шапка*/\\r\\n.board-name_block {\\r\\n    display: flex;\\r\\n    align-items: center;\\r\\n    width: 100%;\\r\\n    height: 50px;\\r\\n    padding: 15px;\\r\\n    border: 3px solid #6F8DA9;\\r\\n    border-radius: 5px;\\r\\n    background-color: rgba(110, 178, 236, 0.2);\\r\\n}\\r\\n/* .header-tools {\\r\\n    display: flex;\\r\\n    align-items: center;\\r\\n    height: 15vh;\\r\\n    width: 100vw;\\r\\n} */\\r\\n\\r\\n/*Левая боковая панель*/\\r\\n.left-sidebar .sidebar_hide-button {\\r\\n    cursor: pointer;\\r\\n    transition: transform 0.5s;\\r\\n}\\r\\n.left-sidebar {\\r\\n    width: 15%;\\r\\n    height: 94vh;\\r\\n    border-top: none;\\r\\n    transition: width 0.5s;\\r\\n}\\r\\n.sidebar_header {\\r\\n    width: 100%;\\r\\n}\\r\\n.sidebar_main {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-items: center;\\r\\n}\\r\\n.board-list {\\r\\n    width: 100%;\\r\\n    padding: 15px;\\r\\n    text-align: right;\\r\\n}\\r\\n.board-list_item {\\r\\n    padding: 10px;\\r\\n    list-style: none;\\r\\n    font-size: 16px;\\r\\n    cursor: pointer;\\r\\n    border-radius: 10px;\\r\\n    transition: background-color 0.3s;\\r\\n}\\r\\n.board-list_item:first-of-type {\\r\\n    margin-top: 0;\\r\\n}\\r\\n.board-list_item:hover {\\r\\n    background-color: rgba(90, 35, 131, 0.3)\\r\\n}\\r\\n.board-list_item.active {\\r\\n    background-color: rgba(90, 35, 131, 0.3)\\r\\n}\\r\\n.create_board {\\r\\n    display: flex;\\r\\n    justify-content: space-around;\\r\\n    align-items: center;\\r\\n    width: 90%;\\r\\n    height: 50px;\\r\\n    border: 2px solid #16222D;\\r\\n    border-radius: 5px;\\r\\n    color: #C351DD;\\r\\n    background-color: rgba(110, 178, 236, 0.2);\\r\\n    cursor: pointer;\\r\\n}\\r\\n\\r\\n/*Центральный блок*/\\r\\n.central-block {\\r\\n    display: flex;\\r\\n}\\r\\n.board-holder {\\r\\n    display: flex;\\r\\n    width: 85%;\\r\\n    padding: 15px;\\r\\n    padding-bottom: 0px;\\r\\n    overflow: auto;\\r\\n    scrollbar-width: 10px;\\r\\n    scrollbar-base-color: #1f2e3c, transparent;\\r\\n}\\r\\n.board-holder::-webkit-scrollbar {\\r\\n    width: 10px;\\r\\n    background-color: transparent;\\r\\n}\\r\\n.board-holder::-webkit-scrollbar-thumb {\\r\\n    border-radius: 20px;\\r\\n    background-color: #1f2e3c; \\r\\n}\\r\\n.board {\\r\\n    display: flex;\\r\\n    width: 100%;\\r\\n}\\r\\n.board_main {\\r\\n    display: flex;\\r\\n}\\r\\n.column-holder {\\r\\n    width: 250px;\\r\\n    height: 100%;\\r\\n    margin-right: 30px;\\r\\n    border-radius: 20px;\\r\\n    transition: background-color 0.3s;\\r\\n}\\r\\n.column { \\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-items: center;\\r\\n    width: 260px;\\r\\n    height: 90vh;\\r\\n    margin-right: 30px;\\r\\n    padding: 5px 10px;\\r\\n    background-color: rgba(110, 178, 236, 0.2);\\r\\n    border-radius: 20px;\\r\\n    font-weight: bold;\\r\\n}\\r\\n.column.activated {\\r\\n    height: 80px;\\r\\n}\\r\\n.column.created {\\r\\n    height: 95vh;\\r\\n    background-color: rgba(110, 178, 236, 0.2);\\r\\n}\\r\\n.column_title {\\r\\n    text-align: center;\\r\\n}\\r\\n.create_btn {\\r\\n    display: flex;\\r\\n    justify-content: space-around;\\r\\n    align-items: center;\\r\\n    width: 250px;\\r\\n    min-width: 250px;\\r\\n    height: 50px;\\r\\n    background-color: rgba(110, 178, 236, 0.2);\\r\\n    border-radius: 20px;\\r\\n    cursor: pointer;\\r\\n}\\r\\n.create_card {\\r\\n    width: 90%;\\r\\n    height: 50px;\\r\\n    border: 2px solid #16222D;\\r\\n    border-radius: 5px;\\r\\n    color: #4DC21E;\\r\\n    background-color: #1f2e3c;\\r\\n}\\r\\n.column .name_input {\\r\\n    width: 100%;\\r\\n    height: 20px;\\r\\n}\\r\\n.column .btn-block {\\r\\n    display: flex;\\r\\n    justify-content: space-around;\\r\\n    margin-top: 10px;\\r\\n}\\r\\n.column .header {\\r\\n    display: flex;\\r\\n    justify-content: center;\\r\\n    position: relative;\\r\\n    width: 100%;\\r\\n    min-height: 40px;\\r\\n    padding: 10px 0;\\r\\n}\\r\\n.column .naming-block {\\r\\n    padding-bottom: 10px;\\r\\n    border-bottom: 1px solid #16222D;\\r\\n}\\r\\n.column .finished-block {\\r\\n    display: flex;\\r\\n    align-items: center;\\r\\n    justify-content: space-between;\\r\\n    width: 100%;\\r\\n    border-bottom: 1px solid #16222D;\\r\\n}\\r\\n.column .options-btn {\\r\\n    padding: 10px;\\r\\n    cursor: pointer;\\r\\n}\\r\\n.column .options-list {\\r\\n    position: absolute;\\r\\n    top: 0%;\\r\\n    right: -20%;\\r\\n    border: 2px solid #16222D;\\r\\n    border-radius: 5px;\\r\\n    background-color: #315371;\\r\\n    font-size: 0.8em;\\r\\n    list-style: none;\\r\\n    z-index: 5;\\r\\n}\\r\\n.column .option-element {\\r\\n    padding: 10px;\\r\\n    cursor: pointer;\\r\\n    border-bottom: 1px solid #16222D;\\r\\n    transition: background-color 0.3s;\\r\\n}\\r\\n.column .option-element:hover {\\r\\n    background-color: #16222D;\\r\\n}\\r\\n.column .option-element:last-of-type {\\r\\n    border-bottom: none;\\r\\n}\\r\\n.column[data-state=\\\"initialized\\\"] .main {\\r\\n    min-height: 20px;\\r\\n    max-height: 85%;\\r\\n    padding-left: 15px;\\r\\n    overflow-y: scroll;\\r\\n    scrollbar-width: 10px;\\r\\n    scrollbar-base-color: #1f2e3c, transparent;\\r\\n}\\r\\n\\r\\n.column[data-state=\\\"initialized\\\"] .main::-webkit-scrollbar {\\r\\n    width: 10px;\\r\\n    background-color: transparent;\\r\\n}\\r\\n.column[data-state=\\\"initialized\\\"] .main::-webkit-scrollbar-thumb {\\r\\n    border-radius: 20px;\\r\\n    background-color: #1f2e3c; \\r\\n}\\r\\n\\r\\n\\r\\n.card {\\r\\n    width: 220px;\\r\\n    max-height: 200px;\\r\\n    margin: 10px 5px 10px 0;\\r\\n    border-radius: 20px;\\r\\n    cursor: grab;\\r\\n    transition: top 0.5s;\\r\\n}\\r\\n.card.create {\\r\\n    display: flex;\\r\\n    justify-content: center;\\r\\n    padding: 15px;\\r\\n    /* height: 150px; */\\r\\n}\\r\\n.card .create_btn {\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n    padding: 15px;\\r\\n    cursor: pointer;\\r\\n}\\r\\n.card .naming-block {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-items: center;\\r\\n    padding: 15px;\\r\\n    border: none;\\r\\n}\\r\\n.card .btn-block {\\r\\n    display: flex;\\r\\n    justify-content: space-around;\\r\\n    width: 100%;\\r\\n    margin-top: 10px;\\r\\n}\\r\\n.card .finished-block {\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n    align-items: center;\\r\\n    position: relative;\\r\\n    padding: 10px;\\r\\n    width: 100%;\\r\\n    height: 100%;\\r\\n    border: none;\\r\\n}\\r\\n.card .title {\\r\\n    overflow-x: hidden;\\r\\n}\\r\\n.card .options-btn {\\r\\n    padding: 10px;\\r\\n    cursor: pointer;\\r\\n}\\r\\n.card .options-list {\\r\\n    position: absolute;\\r\\n    top: -10%;\\r\\n    right: 0%;\\r\\n    border: 1px solid #16222D;\\r\\n    border-radius: 5px;\\r\\n    background-color: #315371;\\r\\n    font-size: 0.8em;\\r\\n    list-style: none;\\r\\n    z-index: 2;\\r\\n}\\r\\n.card .option-element {\\r\\n    padding: 10px;\\r\\n    cursor: pointer;\\r\\n    border-bottom: 1px solid #16222D;\\r\\n    transition: background-color 0.3s;\\r\\n}\\r\\n.card .option-element:hover {\\r\\n    background-color: #16222D;\\r\\n}\\r\\n.card .option-element:last-of-type {\\r\\n    border-bottom: none;\\r\\n}\\r\\n/*Интерактивные стили*/\\r\\n.hide {\\r\\n    display: none !important;\\r\\n}\\r\\n\\r\\n.over {\\r\\n    background-color: rgba(255, 255, 255, 0.2);\\r\\n}\\r\\n.hold {\\r\\n    opacity: 0.5;\\r\\n}\\r\\n.mirrored {\\r\\n    transform: scaleX(-1);\\r\\n}\\r\\n.left-sidebar.hide {\\r\\n    display: block !important;\\r\\n    overflow: hidden;\\r\\n    width: 50px;\\r\\n}\\r\\n.flex-column {\\r\\n    flex-direction: column;\\r\\n}\\r\\n.flex-row {\\r\\n    flex-direction: row;\\r\\n}\\r\\n\\r\\n/*Визуальный общие стили*/\\r\\n.green {\\r\\n    background-color: rgba(43, 155, 20, 0.6);\\r\\n}\\r\\n.red {\\r\\n    background-color: rgba(210, 40, 40, 0.6);\\r\\n}\\r\\n.purple {\\r\\n    background-color: rgba(147, 17, 165, 0.6);\\r\\n}\\r\\n.yellow {\\r\\n    background-color: rgba(210, 186, 32, 0.6);\\r\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tackello/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://tackello/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://tackello/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://tackello/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://tackello/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://tackello/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://tackello/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://tackello/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/assets/fonts/Roboto/Roboto-Bold.ttf":
/*!*************************************************!*\
  !*** ./src/assets/fonts/Roboto/Roboto-Bold.ttf ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"75371f53f06181df75f1.ttf\";\n\n//# sourceURL=webpack://tackello/./src/assets/fonts/Roboto/Roboto-Bold.ttf?");

/***/ }),

/***/ "./src/assets/fonts/Roboto/Roboto-Italic.ttf":
/*!***************************************************!*\
  !*** ./src/assets/fonts/Roboto/Roboto-Italic.ttf ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"beb7fe13e61b9e683c37.ttf\";\n\n//# sourceURL=webpack://tackello/./src/assets/fonts/Roboto/Roboto-Italic.ttf?");

/***/ }),

/***/ "./src/assets/fonts/Roboto/Roboto-Regular.ttf":
/*!****************************************************!*\
  !*** ./src/assets/fonts/Roboto/Roboto-Regular.ttf ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"a8d6ac03c7b96b7acb62.ttf\";\n\n//# sourceURL=webpack://tackello/./src/assets/fonts/Roboto/Roboto-Regular.ttf?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;
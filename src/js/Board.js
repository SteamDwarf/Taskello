let baseName = 'TaskelloDB';
let storeName = 'boards';

function logerr(err){
	console.log(err);
}

function connectDB(f){
	let request = indexedDB.open(baseName, 1);
	request.onerror = logerr;
	request.onsuccess = function(){
		f(request.result);
	}
	request.onupgradeneeded = function(e){
		e.currentTarget.result.createObjectStore(storeName, { keyPath: "id" });
		connectDB(f);
	}
}

function getFile(file, f){
	connectDB(function(db){
		var request = db.transaction([storeName], "readonly").objectStore(storeName).get(file);
		request.onerror = logerr;
		request.onsuccess = function(){
			f(request.result ? request.result : -1);
		}
	});
}

function getStorage(f){
	connectDB(function(db){
		var rows = [],
			store = db.transaction([storeName], "readonly").objectStore(storeName);

		if(store.mozGetAll)
			store.mozGetAll().onsuccess = function(e){
				f(e.target.result);
			};
		else
			store.openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor){
					rows.push(cursor.value);
					cursor.continue();
				}
				else {
					f(rows);
				}
			};
	});
}

function setFile(file){
	connectDB(function(db){
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).put(file);
		request.onerror = logerr;
		request.onsuccess = function(){
			return request.result;
		}
	});
}

function delFile(file){
	connectDB(function(db){
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).delete(file);
		request.onerror = logerr;
		request.onsuccess = function(){
			console.log("File delete from DB:", file);
		}
	});
}

export {setFile};

/* let boardsData = [];
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
function renameColumn(id, title) {
    console.log('id:' + id);
    console.log('title:' + title);
}

export {createBoard, openBoard, addColumn, renameColumn}; */
var origBoard;
var huPlayer = 'O';
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
var textTurn = document.getElementById("turn");
textTurn.innerText = "O Turn";
const cells = document.querySelectorAll('.cell');

startGame();

function startGame(){
    huPlayer = 'O';
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for(var i = 0;i<cells.length;i++){
        cells[i].innerText='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square){
    if(!checkTie()){
        if(typeof origBoard[square.target.id]=='number' && huPlayer==='O'){
            turn(square.target.id, huPlayer);
			textTurn.innerText = "X Turn";
            huPlayer = 'X';
        }else
            {
				textTurn.innerText = "O Turn";
                turn(square.target.id, huPlayer);
                huPlayer = 'O';
            }
        }
        cells[square.target.id].removeEventListener('click', turnClick, false);
}

function turn(squareId, player){
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon);
}

function checkWin(board, player){
    let plays = board.reduce((a, e, i)=>
    (e === player) ? a.concat(i): a,[]);
   
    let gameWon = null;

    for(let [index, win] of winCombos.entries()){
        if(win.every(elem => plays.indexOf(elem)> -1)){
            gameWon = {index:index,player:player};
            break;
        }
    }
   return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
        gameWon.player == huPlayer ? "#98fb98" : "#e62020";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
    }
    textTurn.innerText = "";
    declareWinner(gameWon.player == huPlayer ? "Player "+ huPlayer + " Win" : "Player "+ huPlayer + " Win" );
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}

function declareWinner(who){
    document.querySelector(".endgame").style.display = "block";
	textTurn.innerText="";
    document.querySelector(".endgame .text").innerText = who;
}



function checkTie(){
    console.log(emptySquares().length);
    if(emptySquares().length==1){
        document.getElementById(emptySquares()[0]).innerText = huPlayer;
        for(var i=0;i<cells.length;i++){
            cells[i].style.backgroundColor = "#ff6e4a";
            cells[i].removeEventListener('click',turnClick, false);
        }
        declareWinner("Tie Game!");
    return true;
    }
    return false;
    
}

//BASIC SETUP  (PART-1)

var originalBoard;
const humanPlayer = 'O';
const aiPlayer = 'X';
const WiningCombs = [[0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] , [0,4,8] , [6,4,2]];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	originalBoard = Array.from(Array(9).keys());

	for (var i=0 ; i<cells.length ; i++)
	{
		cells[i].innerText = "";
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click' , turnClick , false);
	}
}

function turnClick(square)
{
	if (typeof originalBoard[square.target.id] == 'number')
	{
		turn(square.target.id, humanPlayer);
		if (!checkTie())
		{
			turn(bestSpot(), aiPlayer);
		}
	}
}

function turn(squareId , player)
{
	originalBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;

//DETERMINE WINNER (PART-2)
	let gameWon = checkWin(originalBoard, player);
	if (gameWon) gameOver(gameWon)
}

function checkWin(board , player) {
	let plays = board.reduce((a, e, i) => (e===player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of WiningCombs.entries())
	{
		if (win.every(elem => plays.indexOf(elem) > -1))
		{
			gameWon = {index: index, player: player}
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of WiningCombs[gameWon.index])
	{
		document.getElementById(index).style.backgroundColor = gameWon.player == humanPlayer ? "blue" : "red";
	}

	for (var i=0 ; i<cells.length ; i++) 
	{
		cells[i].removeEventListener('click' , turnClick , false);
	}

//JAVASCRIPT BASIC AI AND WINNER BOX (PART-3)

	declareWinner(gameWon.player == humanPlayer ? "You Win !" : "You Lose.")
}


function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return originalBoard.filter( s => typeof s == 'number');
}

function bestSpot()
{
	return emptySquares()[0];
}

function checkTie()
{
	if (emptySquares().length == 0)
	{
		for (var i=0 ; i<cells.length ; i++)
		{
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click' , turnClick , false);
		}
		declareWinner("Tie Game !");
		return true;
	}
	return false;
}
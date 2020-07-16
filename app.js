const startGame = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('#overlay');
const qwerty = document.querySelector('#qwerty');
const keyrow = document.querySelectorAll('.keyrow');
const keys = document.querySelectorAll('.keyrow button');
const phraseDiv = document.querySelector('#phrase');
const ul = document.querySelector('ul');
const hearts = document.querySelector('ol');

let missed = 0;

const phrases = [
	'this is a test',
	'again this is a test',
	'you know this is a test',
	'test test test test',
	'lots of tests here'
];

startGame.addEventListener('click', function() {
	startOverlay.style.display = 'none';
});

const phraseArray = chooseRandomPhrase(phrases);
createGameBoard(phraseArray);

function chooseRandomPhrase(arr) {
	//generate a random number between 1 and phrases.length
	const phrase = Math.floor(Math.random() * arr.length);
	//return the phrase at that index
	return arr[phrase].split('');
}

//function that creates a game board
function createGameBoard(arr) {
	for (let i = 0; i < arr.length; i++) {
		const li = document.createElement('li');
		li.textContent = arr[i];
		//if li is a letter apply classname letter
		if (arr[i] != ' ') {
			li.className = 'letter';
		} else {
			li.className = 'space';
		}
		ul.appendChild(li);
	}
}

function checkLetter(button) {
	const lis = document.querySelectorAll('.letter');
	let match = null;
	for (let i = 0; i < lis.length; i++) {
		if (button.textContent.toLowerCase() === lis[i].textContent.toLowerCase()) {
			button.className = 'show';
			match = button.textContent;
			lis[i].style.color = 'black';
			lis[i].style.backgroundColor = '#78CF82';
			lis[i].className = 'letter show';
		}
	}
	return match;
}

qwerty.addEventListener('click', (event) => {
	const button = event.target;
	if (button.tagName === 'BUTTON') {
		button.className = 'chosen';
		button.setAttribute('disabled', 'true');
	}
	const checkedLetter = checkLetter(button);
	const liveHeart = document.querySelectorAll('.tries');
	const lostHeart = document.createElement('li');
	lostHeart.innerHTML = "<img src = 'images/lostHeart.png' height='35px' width='30px'>";
	lostHeart.style.marginRight = '4px';
	if (checkedLetter === null) {
		hearts.removeChild(liveHeart[0]);
		hearts.appendChild(lostHeart);
		missed += 1;
	}
	checkWin();
	resetGame();
});

function checkWin() {
	const possibleLetters = document.querySelectorAll('ul .letter');
	const actualLetters = document.querySelectorAll('ul .show');
	if (possibleLetters.length === actualLetters.length) {
		startOverlay.classList.add('win');
		startOverlay.firstElementChild.textContent = 'You won!';
		startOverlay.style.display = 'flex';
		startGame.textContent = 'Want to play again?';
	}
	if (missed > 4) {
		startOverlay.classList.add('lose');
		startOverlay.firstElementChild.textContent = 'Try again!';
		startOverlay.style.display = 'flex';
		startGame.textContent = 'Want to play again?';
	}
}

function resetGame() {
	//reset keyboard buttons
	keys.classList.remove('chosen', 'show');

	//reset game board
	phraseArray.length = 0;

	//reset hearts

	//set missed to 0
	missed = 0;
}

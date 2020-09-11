const startGame = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('#overlay');
const qwerty = document.querySelector('#qwerty');
const keys = document.querySelectorAll('.keyrow button');
const ul = document.querySelector('ul');
const board = document.querySelector('#phrase');
const hearts = document.querySelector('ol');

let missed = 0;

const phrases = [
	'I have many leather bound books',
	'I love lamp',
	'Milk was a bad choice',
	'Sixty percent of the time it works every time',
	'I immediately regret this decision',
	'You stay classy San Diego',
	'Im in a glass case of emotion',
	'Im kind of a big deal'
];

const phraseArray = chooseRandomPhrase(phrases);


function appendPhrase(phrase) {
	const phraseEl = document.createElement('div');
  	phraseEl.classList.add('board-phrase');
	phrase.split(' ').forEach(word => {
  		appendWord(word, phraseEl);
  });
  board.appendChild(phraseEl);
}

function appendWord(word, container) {
	const wordEl = document.createElement('div');
  wordEl.classList.add('board-word');
  
  word.split('').forEach(letter => {
  	appendLetter(letter, wordEl);
  });
  
	container.appendChild(wordEl);
}

function appendLetter(letter, container) {
	const letterEl = document.createElement('div');
  letterEl.classList.add('board-letter');
  letterEl.textContent = letter;
  container.appendChild(letterEl);
}

startGame.addEventListener('click', function() {
	if (startGame.textContent === 'Start Game') {
		startOverlay.style.display = 'none';
		appendPhrase(chooseRandomPhrase(phrases));
	} else if ((startGame.textContent = 'Want to play again?')) {
		resetGame();
		appendPhrase(chooseRandomPhrase(phrases));
	}
});

function chooseRandomPhrase(arr) {
	//generate a random number between 1 and phrases.length
	const phrase = Math.floor(Math.random() * arr.length);
	//return the phrase at that index
	return arr[phrase];
}

//function that creates a game board
// function createGameBoard(arr) {
// 	for (let i = 0; i < arr.length; i++) {
// 		const li = document.createElement('li');
// 		li.textContent = arr[i];
// 		//if li is a letter apply classname letter
// 		if (arr[i] != ' ') {
// 			li.className = 'letter';
// 		} else {
// 			li.className = 'space';
// 		}
// 		ul.appendChild(li);
// 	}
// }

function checkLetter(button) {
	const lis = document.querySelectorAll('.board-letter');
	let match = null;
	for (let i = 0; i < lis.length; i++) {
		if (button.textContent.toLowerCase() === lis[i].textContent.toLowerCase()) {
			button.className = 'show';
			match = button.textContent;
			lis[i].style.color = 'black';
			lis[i].style.backgroundColor = '#78CF82';
			lis[i].className = 'board-letter show';
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
	if (checkedLetter === null && button.tagName === 'BUTTON') {
		hearts.removeChild(liveHeart[0]);
		hearts.appendChild(lostHeart);
		missed += 1;
	}
	checkWin();
});

function checkWin() {
	const possibleLetters = document.querySelectorAll('#phrase .board-letter');
	const actualLetters = document.querySelectorAll('#phrase .show');
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
	startOverlay.style.display = 'none';
	startOverlay.classList.remove('win', 'lose');
	//reset keyboard buttons
	for (let i = 0; i < keys.length; i++) {
		keys[i].classList.remove('chosen', 'show');
		if ((keys[i].disabled = true)) {
			keys[i].disabled = false;
		}
	}
	//reset game board
	board.innerHTML = '';
	//reset hearts
	hearts.innerHTML =
		'<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li> \
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li> \
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li> \
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li> \
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>';
	//set missed to 0
	missed = 0;
}

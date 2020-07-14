const startGame = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('#overlay');
const qwerty = document.querySelector('#qwerty');
const phraseDiv = document.querySelector('#phrase');
const ul = document.querySelector('ul');

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
	const phraseArray = chooseRandomPhrase(phrases);
	createGameBoard(phraseArray);
});

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
		ul.appendChild(li);
		//if li is a letter apply classname letter
		if (arr[i] != ' ') {
			li.className = 'letter';
		}
	}
}
//creates lis in ul that matches the num of substrings in chosenPhrase
//

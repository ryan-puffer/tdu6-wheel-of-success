const startGame = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('#overlay');

startGame.addEventListener('click', function() {
	startOverlay.style.display = 'none';
});

const phrases = [ "Epstein didn't kill himself", 'JavaScript is fun', 'Did we just become best friends?' ];

function chooseRandomPhrase() {
	//generate a random number between 1 and phrases.length
	const phrase = Math.floor(Math.random() * phrases.length);
	//return the phrase at that index
	return phrases[phrase];
}

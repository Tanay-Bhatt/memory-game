cards = document.querySelectorAll('.card')
faces = [
	'images/panda.png',
	'images/penguin.png',
	'images/rhino.png',
	'images/dog.png',
	'images/panda.png',
	'images/penguin.png',
	'images/rhino.png',
	'images/dog.png'
]

let score = 0,
	maxScore = 4,
	firstCard = null,
	secondCard = null,
	boardDisabled = true,
	moves = 0,
	sec = null,
	min = null,
	interval = null;

function shuffle(array) {
	for (let i = array.length -1; i>0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}


function start() {
	score = 0;
	moves = 0;
	sec = 0;
	min = 0;
	document.querySelector('.moves span').innerText = '0'
	document.querySelector('.timer span').innerText = '00:00';
	cards.forEach(card => {
		if (card.classList.contains('show')) {
			card.classList.toggle('show');
		}
	})
	shuffle(faces);
	for (let i = 0; i < cards.length; i++) {
		cards[i].querySelector('.back img').src = faces[i];
	}
	boardDisabled = false;
	startTimer()
}

function flipCard() {
	if (boardDisabled) return;
	if (this.classList.contains('show')) return;
	if (!firstCard) {
		firstCard = this;
		this.classList.toggle('show');
	}

	else {
		if (!secondCard) {
			moves += 1;
			document.querySelector('.moves span').innerText = moves;
			secondCard = this;
			this.classList.toggle('show');
			if (firstCard.querySelector('img').src == 
				secondCard.querySelector('img').src) {
				firstCard = null;
				secondCard = null;
				score += 1;
				if (score == maxScore) {
					clearInterval(interval);
					interval = null;
				} 
			} else {
				setTimeout(()=> {
					firstCard.classList.toggle('show');
					secondCard.classList.toggle('show');
					firstCard = null;
					secondCard = null;
				}, 1000);
			}
		}
	}
}



function startTimer() {
	if (!interval) {
		interval = setInterval(()=> {
			sec += 1;
			if (sec == 60) {
				min += 1;
				sec = 0;
			}

			document.querySelector('.timer span').innerText = `${(min<10) ? '0'+min : min} : ${(sec<10) ? '0'+sec : sec}`
		}, 1000)
	}
}

cards.forEach(card => {
	card.addEventListener('click', flipCard);
})

document.querySelector('.start button').onclick = ()=> {
	document.querySelector('.start button').innerText = 'Restart';
	start()
}
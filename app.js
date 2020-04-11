document.addEventListener('DOMContentLoaded', () => {
    createBoard();
});

// Card options
const cardArray = [
    { name: 'fries', img: 'images/fries.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'fries', img: 'images/fries.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' }
]

cardArray.sort(() => 0.5 - Math.random());
var grid = document.querySelector('.grid');
const timeCounter = document.querySelector('#timeCounter');
const resultDisplay = document.querySelector('#result');
var cardsChosenId = [];
var cardsChosen = [];
var cardsWon = [];
var gameTimer;
let startTime;
let checkingMatches = false;

//Create game board
function createBoard() {
    cardArray.forEach(item => {
        var card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', cardArray.indexOf(item));
        card.addEventListener('click', flipcard);
        grid.appendChild(card);
    });
    startTime = new Date().getTime();
    gameTimer = setInterval(showTimerCount,1000);
}

//Check for matches
function checkForMatch() {
    let cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click',flipcard);
        cards[optionTwoId].removeEventListener('click',flipcard);
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
        clearInterval(gameTimer);
        resultDisplay.textContent = 'Congratulations! You found all! :)';
    }
    checkingMatches = false;
}

//flip your card
function flipcard() {
    if (!checkingMatches){
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            checkingMatches = true;
            setTimeout(checkForMatch, 500);
        }
    }
    else{
        console.log("please wait...");
    }
}

//Set Timer for game
function showTimerCount() {
    const duration = Date.now() - startTime;
    const minutes = Math.floor((duration % (1000 * 60 *60)) / (1000 * 60));
    const seconds = Math.floor((duration  % (1000 *60)) / 1000);
    timeCounter.textContent = "Minute:" + minutes.toString() + " Second: " + seconds.toString();
}


//Reset the game board
function ResetBoard() {
    cardArray.sort(() => 0.5 - Math.random());
    cardsChosenId = [];
    cardsChosen = [];
    cardsWon = [];
    grid.innerHTML = "";
    resultDisplay.innerHTML = "";
    clearInterval(gameTimer);
    createBoard();
}
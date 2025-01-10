function createDeck() {
    let colors = ["clubs", "diamonds", "hearts", "spades"];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let deck = [];

    for (let color of colors) {
        for (i=0; i<values.length; i++) {
            if (values[i] === "A") {
                deck.push({
                    card: values[i],
                    value: 11,
                    color: color
                });
            } else if (values[i] === "10" || values[i] === "J" || values[i] === "Q" || values[i] === "K") {
                deck.push({
                    card: values[i],
                    value: 10,
                    color: color
                });
            } else {
                deck.push({
                    card: values[i],
                    value: parseInt(values[i]),
                    color: color
                });
            }

        }
    }

    return deck;
}

function displayCards(hands) {
    console.log(hands);
    dealerHandDiv.innerHTML = "";
    userHandDiv.innerHTML = "";

    let num = 0;
    for (let card of hands.dealerHand) {
        let cardDiv = document.createElement("div");
        if (card.color === "diamonds" || card.color === "hearts") {cardDiv.classList.add("red-card")};
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `<p>${card.card}</p><img src="images/${card.color}.png">`;
        dealerHandDiv.appendChild(cardDiv);

        if (num === 1) {
            cardDiv.classList.add("hidden");
        }
        num++
    }

    for (let card of hands.userHand) {
        let cardDiv = document.createElement("div");
        if (card.color === "diamonds" || card.color === "hearts") {cardDiv.classList.add("red-card")};
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `<p>${card.card}</p><img src="images/${card.color}.png">`;
        userHandDiv.appendChild(cardDiv);
    }

    let dealerValueSum = 0;
    let userValueSum = 0;
    let dealerHasDoubleAce = false;

    if (hands.dealerHand[0].card === "A" && hands.dealerHand[1].card === "A"){
        hands.dealerHand[1].value = 1;
        dealerValueSum += hands.dealerHand[0].value + hands.dealerHand[1].value
        dealerHasDoubleAce = true;
    } else {
        dealerValueSum += hands.dealerHand[0].value + hands.dealerHand[1].value;
    }

    if (hands.userHand[0].card === "A" && hands.userHand[1].card === "A"){
        hands.userHand[1].value = 1;
        userValueSum += hands.userHand[0].value + hands.userHand[1].value;
    } else {
        userValueSum += hands.userHand[0].value + hands.userHand[1].value;
        console.log(userValueSum);
    }

    if (dealerValueSum === 21 && userValueSum === 21) {
        statusText.textContent = "Push! You have the same value, you get your chips back!";
        gameStatus = false;
        return false;
    } else if (dealerValueSum === 21) {
        statusText.textContent = `You lost! The dealer got blackjack! You lost ${hands.bet} chips`;
        balance.textContent = userBalance;
        gameStatus = false;
        return false;
    } else if (userValueSum === 21) {
        statusText.textContent = `You WIN! You got blackjack! You win ${hands.bet * 3} chips!`;
        userBalance += hands.bet * 3;
        balance.textContent = userBalance;
        gameStatus = false;
        return false;
    }

    if (dealerHasDoubleAce) {
        dealerValues.textContent = dealerValueSum - hands.dealerHand[1].value;
    } else {
        dealerValues.textContent = dealerValueSum - hands.dealerHand[1].value;
    }
    userValues.textContent = userValueSum;
    statusText.textContent = "What do you wish to do? Hit or Stand?"
    bet.value = "";
}

function drawHands(deck, bet) {
    let dealerHand = [];
    let userHand = [];
    let randomNum = randomNumber(2);
    userBalance -= bet;

    if (randomNum === 0) {
        for (i=0; i<2; i++) {
            let num = randomNumber(deck.length);
            dealerHand.push(deck[num]);
            deck.splice(num, 1);
        }

        for (i=0; i<2; i++) {
            let num = randomNumber(deck.length);
            userHand.push(deck[num]);
            deck.splice(num, 1);
        }
    } else {
        for (i=0; i<2; i++) {
            let num = randomNumber(deck.length);
            userHand.push(deck[num]);
            deck.splice(num, 1);
        }

        for (i=0; i<2; i++) {
            let num = randomNumber(deck.length);
            dealerHand.push(deck[num]);
            deck.splice(num, 1);
        }
    }

    return {
        dealerHand: dealerHand,
        userHand: userHand,
        restDeck: deck,
        bet: parseInt(bet)
    }
}

function checkUserBet(userBet) {
    if (isNaN(userBet)) {
        statusText.textContent = "You did not enter a number, try again";
        return false;
    } else if (userBet <= 0) {
        statusText.textContent = "Your bet must be atleast 1, try again";
        return false;
    } else if (userBet > userBalance) {
        statusText.textContent = `Your bet was too high, you only have ${userBalance} chips`;
        return false;
    } else {
        return true;
    }
}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function userHit(hands) {
    if (!gameStatus) {
        statusText.textContent = "The game is over! You can't hit. Start a new game";
        return false;
    }

    let remainingDeck = hands.restDeck;
    let userHand = hands.userHand;
    let userHandValue = parseInt(userValues.textContent);
    let hasAce = false;
    let aceCount = 0;

    for (let card of userHand) {
        if (card.card === "A") {
            hasAce = true;
            aceCount++;
        }
    }

    let num = randomNumber(remainingDeck.length);
    let cardDiv = document.createElement("div");
    let drawnCard = remainingDeck[num];
    if (drawnCard.color === "diamonds" || drawnCard.color === "hearts") {cardDiv.classList.add("red-card")};
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `<p>${drawnCard.card}</p><img src="images/${drawnCard.color}.png">`;
    userHandDiv.appendChild(cardDiv);
    userHand.push(drawnCard);
    remainingDeck.splice(num, 1);

    if (hasAce) {
        
    } else {
        if (userHandValue + drawnCard.value > 21) {
            statusText.textContent = `Sorry! You've gone bust! You lost ${hands.bet} chips. To play again enter a new bet and press "New game".`;
            userValues.textContent = userHandValue + drawnCard.value;
            gameStatus = false;
            balance.textContent = userBalance;
        } else if (userHandValue + drawnCard.value === 21) {
            userValues.textContent = userHandValue + drawnCard.value;
            statusText.textContent = `Congrats! You got 21! You win ${hands.bet * 2} chips! To play again enter a new bet and press "New game".`;
            gameStatus = false;
            userBalance += hands.bet * 2;
            balance.textContent = userBalance;
        } else {
            userValues.textContent = userHandValue + drawnCard.value;
        }
    }

    hands.userHand = userHand;
    hands.restDeck = remainingDeck;

    console.log(hands);
    return hands;
}


const dealerHandDiv = document.querySelector("#dealer-hand");
const userHandDiv = document.querySelector("#user-hand");
const dealerValues = document.querySelector("#dealer-values");
const userValues = document.querySelector("#user-values");
const hit = document.querySelector("#hit");
const stand = document.querySelector("#stand");
const newGame = document.querySelector("#new-game");
const balance = document.querySelector("#user-balance");
const bet = document.querySelector("#bet");
const statusText = document.querySelector("#status");
let userBalance = 1000;
let gameStatus = false;
let hands;

balance.textContent += userBalance;

newGame.addEventListener("click", () => {
    balance.textContent = userBalance;
    gameStatus = true;
    let isBetValid = checkUserBet(bet.value);
    if (isBetValid) {
        let deck = createDeck();
        hands = drawHands(deck, bet.value);
        displayCards(hands);
    }
});

bet.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        balance.textContent = userBalance;
        gameStatus = true;
        let isBetValid = checkUserBet(bet.value);
        if (isBetValid) {
            let deck = createDeck();
            hands = drawHands(deck, bet.value);
            displayCards(hands);
        }
    }
});

hit.addEventListener("click", () => {
    hands = userHit(hands);
});
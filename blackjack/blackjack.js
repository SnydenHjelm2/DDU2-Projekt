function createDeck() {
    let colors = ["clubs", "diamonds", "hearts", "spades"];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let deck = [];

    for (let color of colors) {
        for (i=0; i<values.length; i++) {
            if (values[i] === "A") {
                deck.push({
                    card: values[i],
                    value: [i+1, 11],
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

function displayCards(obj) {
    dealerHand.innerHTML = "";
    userHand.innerHTML = "";
    dealerValues.textContent = "Dealer Values: ";
    userValues.textContent = "User Values: ";

    for (let card of obj.dealerHand) {
        let cardDiv = document.createElement("div");
        if (card.color === "diamonds" || card.color === "hearts") {cardDiv.classList.add("red-card")};
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `<p>${card.card}</p><img src="images/${card.color}.png">`;
        dealerHand.appendChild(cardDiv);
    }

    for (let card of obj.userHand) {
        let cardDiv = document.createElement("div");
        if (card.color === "diamonds" || card.color === "hearts") {cardDiv.classList.add("red-card")};
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `<p>${card.card}</p><img src="images/${card.color}.png">`;
        userHand.appendChild(cardDiv);
    }

    let dealerValueSum = 0;
    let userValueSum = 0;

    if (obj.dealerHand[0].card === "A" && obj.dealerHand[1].card === "A"){
        dealerValueSum += obj.dealerHand[0].value[1] + obj.dealerHand[1].value[0];
    } else if (obj.dealerHand[0].card === "A") {
        dealerValueSum += obj.dealerHand[0].value[1] + obj.dealerHand[1].value;
    } else if (obj.dealerHand[1].card === "A") {
        dealerValueSum += obj.dealerHand[1].value[1] + obj.dealerHand[0].value;
    } else {
        dealerValueSum += obj.dealerHand[0].value + obj.dealerHand[1].value;
    }

    if (obj.userHand[0].card === "A" && obj.userHand[1].card === "A"){
        userValueSum += obj.userHand[0].value[1] + obj.userHand[1].value[0];
    } else if (obj.userHand[0].card === "A") {
        userValueSum += obj.userHand[0].value[1] + obj.userHand[1].value;
    } else if (obj.dealerHand[1].card === "A") {
        userValueSum += obj.userHand[1].value[1] + obj.userHand[0].value;
    } else {
        userValueSum += obj.userHand[0].value + obj.userHand[1].value;
    }

    dealerValues.textContent += dealerValueSum;
    userValues.textContent += userValueSum;
}

function drawHands(deck) {
    let dealerHand = [];
    let userHand = [];
    let randomNumber = Math.floor(Math.random() * 2);

    if (randomNumber === 0) {
        for (i=0; i<2; i++) {
            let num = Math.floor(Math.random() * deck.length);
            dealerHand.push(deck[num]);
            deck.splice(num, 1);
        }

        for (i=0; i<2; i++) {
            let num = Math.floor(Math.random() * deck.length);
            userHand.push(deck[num]);
            deck.splice(num, 1);
        }
    } else {
        for (i=0; i<2; i++) {
            let num = Math.floor(Math.random() * deck.length);
            userHand.push(deck[num]);
            deck.splice(num, 1);
        }

        for (i=0; i<2; i++) {
            let num = Math.floor(Math.random() * deck.length);
            dealerHand.push(deck[num]);
            deck.splice(num, 1);
        }
    }

    return {
        dealerHand: dealerHand,
        userHand: userHand,
        restDeck: deck,
    }
}


const dealerHand = document.querySelector("#dealer-hand");
const userHand = document.querySelector("#user-hand");
const dealerValues = document.querySelector("#dealer-values");
const userValues = document.querySelector("#user-values");
const hit = document.querySelector("#hit");
const stand = document.querySelector("#stand");
const newGame = document.querySelector("#new-game");
const balance = document.querySelector("#user-balance");
let userBalance = 1000;

balance.textContent += userBalance;

newGame.addEventListener("click", () => {
    let deck = createDeck();
    let hands = drawHands(deck);
    displayCards(hands);
});
function createDeck() {
    let colors = ["clubs", "diamons", "hearts", "spades"];
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

function drawHand(deck) {
    
}


const dealerHand = document.querySelector("#dealer-hand");
const userHand = document.querySelector("#user-hand");
const dealerValues = document.querySelector("#dealer-values");
const userValues = document.querySelector("#user-values");
const hit = document.querySelector("#hit");
const stand = document.querySelector("#stand");
const newGame = document.querySelector("#new-game");
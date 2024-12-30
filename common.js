function addEventListenersToCells(a) {
    let allCells = getAllCells();

    for (let cell of allCells) {
        if (a === "findSame") {
            cell.addEventListener("click", () => {findSame(cell, allCells)});
        }
    }
}

function addHoverToCells() {
    let allCells = getAllCells();
    for (let cell of allCells) {
        cell.classList.add("hover-cells");
    }
}

function clearTable() {
    let allCells = document.querySelectorAll(".cell");
    for (let cell of allCells) {
        cell.remove();
    }
}

function createControls() {
    let message = document.createElement("p");
    let input = document.createElement("input");
    let button = document.createElement("button");
   
    message.textContent = "How many numbers in the grid?";
    message.id = "message";
    input.type = "number";
    input.placeholder = "..."
    input.id = "generate-numbers-input";
    button.textContent = "Create";
    button.id = "generate-numbers-button";

    controlsDiv.appendChild(message);
    controlsDiv.appendChild(input);
    controlsDiv.appendChild(button);
    return {
        inputSelector: document.querySelector("#generate-numbers-input"),
        buttonSelector: document.querySelector("#generate-numbers-button")
    }
} 

function createHomeLink() {
    let home = document.createElement("a");
    home.href = "../index.html";
    home.id = "home";
    home.textContent = "Home";
    homeDiv.appendChild(home);
}

function generateNumbers(amount) {
    for (i=0; i<amount; i++) {
        let randomNum = Math.floor(Math.random() * 100);

        let newNum = document.createElement("div");
        newNum.classList.add("cell");
        newNum.textContent = randomNum;
        newNum.cellID = i + 1;
        tableDiv.appendChild(newNum);
    }
}

function getAllCells() {;
    return document.querySelectorAll(".cell");
}

function removeMarked() {
    let allCells = getAllCells();
    for (let cell of allCells) {
        cell.classList.remove("marked");
    }
}

const homeDiv = document.querySelector("#homeDiv");
const controlsDiv = document.querySelector("#grid-controls");
const tableDiv = document.querySelector("#table");

createHomeLink();
let controls = createControls();
generateNumbers(90);

controls.buttonSelector.addEventListener("click", () => {
    clearTable();
    generateNumbers(controls.inputSelector.value);
});

controls.inputSelector.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        clearTable();
        generateNumbers(controls.inputSelector.value);
    }
});
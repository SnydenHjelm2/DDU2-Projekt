function addEventListenersToCells(a) {
    let allCells = getAllCells();

    for (let cell of allCells) {
        if (a === "findSame") {
            cell.addEventListener("click", () => {findSame(cell, allCells)});
        } else if (a === "clear") {
            cell.addEventListener("click", (e) => {
                if (e.target.className.includes("removed")) {
                    reAddNumberToCell(cell);
                } else {
                    clearCell(cell);
                }
            });   
        } else if (a === "sum") {
            cell.addEventListener("click", () => {markCells(cell)});
        } 
    }
    
}

function addHoverToCells(a, cells) {
    let allCells = getAllCells();

    if (a === "add") {
        for (let cell of allCells) {
            cell.classList.remove("hover-cells-cleared");
            cell.classList.add("hover-cells");
        }
    } else if (a === "cleared") {
        if (cells.length > 0) {
            for (let cell of cells) {
                cell.classList.remove("hover-cells");
                cell.classList.add("hover-cells-cleared");
            }
        } else {
            cells.classList.remove("hover-cells");
            cells.classList.add("hover-cells-cleared");
        }
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
        let randomNum = randomNumber();

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

function randomNumber() {
    let randomNum = Math.floor(Math.random() * 100);
    return randomNum;
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
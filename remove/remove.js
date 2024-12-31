function getRandomNumber() {
    let allCells = getAllCells();
    removeMarked();
    let randomNum = randomNumber().toString();

    let cellsWithNumber = [];
    for (let cell of allCells) {
        if (cell.textContent === randomNum) {
            cell.classList.add("marked");
            cellsWithNumber.push(cell);
        }
    }

    randomNumInput.textContent = randomNum;

    return cellsWithNumber;
}

function removeCellsWithNumber(cells) {
    if (cells.length === 0) {
        removedNumberInput.textContent = `Nothing to remove`;
        return false;
    }

    let cellNumber = cells[0].textContent;
    for (let cell of cells) {
        cell.classList.add("removed");
        cell.textContent = "X";
    }

    removedNumberInput.textContent = `${cellNumber} removed ${cells.length} times`;
}


const findRandomNumButton = document.querySelector("#find-random-num");
const randomNumInput = document.querySelector("#random-number");
const removeButton = document.querySelector("#remove");
const removedNumberInput = document.querySelector("#removed-number");

let currentRandomCells = null;
randomNumInput.textContent = "-";
removedNumberInput.textContent = "-";
addHoverToCells("add");

findRandomNumButton.addEventListener("click", () => {
    currentRandomCells = getRandomNumber();
});

removeButton.addEventListener("click", () => {
    removeCellsWithNumber(currentRandomCells);
    addHoverToCells("cleared", currentRandomCells);
});

controls.buttonSelector.addEventListener("click", () => {
    addHoverToCells("add");
});

controls.inputSelector.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addHoverToCells("add");
    }
});
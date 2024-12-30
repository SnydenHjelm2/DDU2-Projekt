function getRandomNumber() {
    let allCells = getAllCells();
    removeMarked();
    let randomNumber = randomNumber().toString();

    let cellsWithNumber = [];
    for (let cell of allCells) {
        if (cell.textContent === randomNumber) {
            cell.classList.add("marked");
            cellsWithNumber.push(cell);
        }
    }

    randomNumInput.value = randomNumber;

    return cellsWithNumber;
}

function removeCellsWithNumber(cells) {
    if (cells.length === 0) {
        removedNumberInput.value = `Nothing to remove`;
        return false;
    }

    let cellNumber = cells[0].textContent;
    for (let cell of cells) {
        cell.classList.add("removed");
        cell.textContent = "X";
    }

    removedNumberInput.value = `${cellNumber} removed ${cells.length} times`;
}


const findRandomNumButton = document.querySelector("#find-random-num");
const randomNumInput = document.querySelector("#random-number");
const removeButton = document.querySelector("#remove");
const removedNumberInput = document.querySelector("#removed-number");

let currentRandomCells = null;
randomNumInput.value = "";
removedNumberInput.value = "";
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
function getSumOfAllCells() {
    let allCells = getAllCells();
    let sum = 0;

    for (let cell of allCells) {
        sum += parseInt(cell.textContent);
    }

    sumOfAll.value = sum;
}

function markCells(cell) {
    cell.classList.add("marked");
    let cellValue = parseInt(cell.textContent);
    markedCellsSum += cellValue;

    sumOfMarked.value = markedCellsSum;
}

function resetMarked() {
    removeMarked();
    markedCellsSum = 0;
    sumOfMarked.value = "-";
}


const sumOfAll = document.querySelector("#sum-of-all");
const sumOfMarked = document.querySelector("#sum-of-marked");
const reset = document.querySelector("#reset");
sumOfMarked.value = "-";
let markedCellsSum = 0;
getSumOfAllCells();
addEventListenersToCells("sum");

reset.addEventListener("click", resetMarked);

controls.buttonSelector.addEventListener("click", () => {
    getSumOfAllCells();
    addEventListenersToCells("sum");
});

controls.inputSelector.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getSumOfAllCells();
        addEventListenersToCells("sum");
    }
});
function clearCell(cell) {
    cell.classList.add("removed");
    cell.textContent = "";
    addHoverToCells("cleared", cell);
}

function fillClearedCells() {
    let clearedCells = document.querySelectorAll(".removed");

    for (let cell of clearedCells) {
        let randomNum = randomNumber();
        cell.textContent = randomNum;
        addHoverToCells("add", cell);
        cell.classList.remove("removed");
    }
}

function reAddNumberToCell(cell) {
    let randomNumber = Math.floor(Math.random() * 100);
    cell.textContent = randomNumber;

    addHoverToCells("add");
    cell.classList.remove("removed");
}

const fillButton = document.querySelector("#fill");
addHoverToCells("add");
addEventListenersToCells("clear");

fillButton.addEventListener("click", () => {
    fillClearedCells();
});
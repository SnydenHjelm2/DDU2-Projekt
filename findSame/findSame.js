function divEventListeners() {
    let allCells = document.querySelectorAll(".cell");

    for (let div of allCells) {
        div.addEventListener("click", () => {findSame(div, allCells)});
    }
}

function findSame(targetCell, cells) {
    removeMarked();
    targetCell.classList.add("marked");
    let count = 0;
    for (let cell of cells) {
        if (cell.cellID === targetCell.cellID) {
            count++;
            continue;
        } else if (cell.textContent === targetCell.textContent) {
            cell.classList.add("marked");
            count++;
        }
    }
    findSameMessage.textContent = `${count} copies of the number ${targetCell.textContent}`;
    console.log(count)
}

const findSameMessage = document.querySelector("#find-same-message");
const reset = document.querySelector("#find-same-reset");

controls.buttonSelector.addEventListener("click", () => {
    divEventListeners();
});
controls.inputSelector.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        divEventListeners();
    }
});
reset.addEventListener("click", () => {
    removeMarked();
    findSameMessage.textContent = "Click on a number to find copies";
})

divEventListeners();
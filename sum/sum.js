function getSumOfAllCells() {
    let allCells = getAllCells();
    let sum = 0;

    for (let cell of allCells) {
        sum += parseInt(cell.textContent);
    }

    sumOfAll.value = sum;
}

function markCells(cell) {
    
}


const sumOfAll = document.querySelector("#sum-of-all");
const sumOfMarked = document.querySelector("#sum-of-marked");
const reset = document.querySelector("#reset");
getSumOfAllCells();
addEventListenersToCells("sum");

controls.buttonSelector.addEventListener("click", () => {
    getSumOfAllCells();
});

controls.inputSelector.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getSumOfAllCells();
    }
});
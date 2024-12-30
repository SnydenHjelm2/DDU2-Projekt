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
addEventListenersToCells("findSame");

controls.buttonSelector.addEventListener("click", () => {
    addEventListenersToCells("findSame");
});
controls.inputSelector.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addEventListenersToCells("findSame");
    }
});
reset.addEventListener("click", () => {
    removeMarked();
    findSameMessage.textContent = "Click on a number to find copies";
});
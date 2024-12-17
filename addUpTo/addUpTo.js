function findAddUpToCells(sum) {
    console.log(sum);
    let allCells = document.querySelectorAll(".cell");
    for (let cell of allCells) {
        cell.classList.remove("marked");
    }

    let foundCells = false;
    for (let cell of allCells) {
        for (let cell2 of allCells) {
            if (cell.cellID === cell2.cellID) {
                continue;
            } else {
                if (parseInt(cell.textContent) + parseInt(cell2.textContent) === parseInt(sum)) {
                    cell.classList.add("marked");
                    cell2.classList.add("marked");
                    foundCells = true;
                    break;
                }
            }
        }
        if (foundCells) {
            break;
        }
    }
}

const addUpToControls = document.querySelector("#add-up-to-controls");

let input = document.querySelector("#add-up-to-input");
let button = document.querySelector("#add-up-to-button");

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        findAddUpToCells(input.value);
    }
});

button.addEventListener("click", () => {
    findAddUpToCells(input.value);
});
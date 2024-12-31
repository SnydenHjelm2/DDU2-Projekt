function findMostRepeated() {
    let allCells = getAllCells();

    let cellsWithRepetitions = [];
    let mostRepeatedAmount = 0;
    for (let cell of allCells) {
        let count = 1;
        for (let cell2 of allCells) {
            if (cell.cellID === cell2.cellID) {
                continue;
            } else {
                if (cell.textContent === cell2.textContent) {
                    count++
                }
            }
        }
        cell.repeatAmount = count;
        cellsWithRepetitions.push({reps: cell.repeatAmount, cellNr: cell.textContent});
    }

    return cellsWithRepetitions;
}

function markMostRepeatedCells(repeatedCells) {
    let allCells = getAllCells();
    let mostRepeatedAmount = 0;
    let mostRepeatedCells = [];

    for (let obj of repeatedCells) {
        if (obj.reps > mostRepeatedAmount) {
            mostRepeatedCells.splice(0, mostRepeatedCells.length, obj);
            mostRepeatedAmount = obj.reps;
        } else if (obj.reps === mostRepeatedAmount) {
            let sameCellNr = false;
            for (let cell of mostRepeatedCells) {
                if (cell.cellNr === obj.cellNr) {
                    sameCellNr = true;
                    break;
                }
            }

            if (sameCellNr) {
                continue;
            } else {
                mostRepeatedCells.push(obj);
            }
        }
    }

    for (let cell of allCells) {
        for (let obj of mostRepeatedCells) {
            if (cell.textContent === obj.cellNr) {
                cell.classList.add("marked");
            }
        }
    }
    mostRepeated.value = "";
    for (i=0; i<mostRepeatedCells.length; i++) {
        if (i === mostRepeatedCells.length - 1) {
            mostRepeated.value += `${mostRepeatedCells[i].cellNr} (repeated ${mostRepeatedCells[i].reps} times)`;
        } else {
            mostRepeated.value += `${mostRepeatedCells[i].cellNr}, `;
        }
    }

    
}


const mostRepeated = document.querySelector("#most-repeated");
const numberNotInPlace = document.querySelector("#numbers-not-here");
markMostRepeatedCells(findMostRepeated());

controls.buttonSelector.addEventListener("click", () => {
    markMostRepeatedCells(findMostRepeated());
});

controls.inputSelector.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        markMostRepeatedCells(findMostRepeated());
    }
});
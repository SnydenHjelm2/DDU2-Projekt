function findMostRepeated() {
    let allCells = getAllCells();

    let cellsWithRepetitions = [];
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

function findNumbersNotInPlace() {
    let allCells = getAllCells();
    numberNotInPlace.textContent = "";

    let numbersNotPresent = [];
    for (i=0; i<100; i++) {
        let foundNumber = false;
        for (let cell of allCells) {
            if (parseInt(cell.textContent) === i) {
                foundNumber = true;
                break;
            }
        }
        
        if (!foundNumber) {
            numbersNotPresent.push(i);
        }
    }

    for (i=0; i<numbersNotPresent.length; i++) {
        if (i === numbersNotPresent.length - 1) {
            numberNotInPlace.textContent += `${numbersNotPresent[i]}`;
        } else {
            numberNotInPlace.textContent += `${numbersNotPresent[i]}, `;
        }
    }
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

    mostRepeated.textContent = "";
    for (i=0; i<mostRepeatedCells.length; i++) {
        if (i === mostRepeatedCells.length - 1) {
            mostRepeated.textContent += `${mostRepeatedCells[i].cellNr} (repeated ${mostRepeatedCells[i].reps} times)`;
        } else {
            mostRepeated.textContent += `${mostRepeatedCells[i].cellNr}, `;
        }
    }

    
}


const mostRepeated = document.querySelector("#most-repeated");
const numberNotInPlace = document.querySelector("#numbers-not-here");
markMostRepeatedCells(findMostRepeated());
findNumbersNotInPlace();

controls.buttonSelector.addEventListener("click", () => {
    markMostRepeatedCells(findMostRepeated());
    findNumbersNotInPlace();
});

controls.inputSelector.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        markMostRepeatedCells(findMostRepeated());
        findNumbersNotInPlace();
    }
});
function divEventListeners() {
    let allCells = document.querySelectorAll(".cell");

    for (let div of allCells) {
        div.addEventListener("click", () => {findSame(div.textContent, allNumberDivs)});
    }
}

function findSame(divNumber, cells) {
    
}



controls.buttonSelector.addEventListener("click", () => {
    divEventListeners(controls.inputSelector.value)
});
controls.inputSelector.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        divEventListeners(controls.inputSelector.value);
    }
});

divEventListeners();
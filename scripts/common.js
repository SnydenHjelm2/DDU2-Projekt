function createControls() {
    let message = document.createElement("p");
    let input = document.createElement("input");
    let button = document.createElement("button");
   
    message.textContent = "How many numbers in the grid?";
    message.id = "message";
    input.type = "number";
    input.placeholder = "A number please..."
    input.id = "generate-numbers-input";
    button.textContent = "Create";
    button.id = "generate-numbers-button";

    controlsDiv.appendChild(message);
    controlsDiv.appendChild(input);
    controlsDiv.appendChild(button);
    return {
        inputSelector: document.querySelector("#generate-numbers-input"),
        buttonSelector: document.querySelector("#generate-numbers-button")
    }
} 

function createHomeLink() {
    let home = document.createElement("a");
    home.href = "../index.html";
    home.id = "home";
    home.textContent = "Home";
    homeDiv.appendChild(home);
}



const homeDiv = document.querySelector("#homeDiv");
const controlsDiv = document.querySelector("#grid-controls");
const tableDiv = document.querySelector("#table");

createHomeLink();
let controls = createControls();
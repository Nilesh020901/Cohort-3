const colorPanel = document.getElementById("color-panel");
const addColorBtn = document.getElementById("add-color-button");
const colorInput = document.getElementById("custom-color");

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

document.querySelectorAll(".color-button").forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.getAttribute("data-color");
        changeBackgroundColor(color);
    });
});

addColorBtn.addEventListener("click", () => {
    const newColor = colorInput.value.trim();
    if (!newColor) {
        alert("Please enter a valid color.");
        return;
    }

    const newButton = document.createElement("button");
    newButton.className = "color-button";
    newButton.setAttribute("data-color", newColor);
    newButton.style.backgroundColor = newColor;
    newButton.textContent = newColor;
    newButton.addEventListener("click", () => {
        changeBackgroundColor(newColor);
    });
    newButton.addEventListener("dblclick", () => {
        colorPanel.removeChild(newButton);
        changeBackgroundColor("white"); 
    })
    colorPanel.appendChild(newButton);
    colorInput.value = "";
});



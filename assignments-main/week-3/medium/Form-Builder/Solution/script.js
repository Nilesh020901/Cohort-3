document.getElementById('add-field-btn').addEventListener("click", function () {
    // body..
    const fieldtype = document.getElementById("field-type").value;
    const formpreview = document.getElementById("form-preview");
    const formHTML = document.getElementById("form-html");

    //Generate the new field based on selected
    let newFeild;
    if (fieldtype === "text") {
        newFeild = createTextInput();
    }
    else if (fieldtype === "checkbox") {
        newFeild = createCheckbox();
    }
    else if (fieldtype === "radio") {
        newFeild = createRadioBtn();
    }
    formpreview.appendChild(newFeild);
    updateFormHTML(formpreview);
});

function createTextInput() {
    // body...
    const div = document.createElement("div");
    div.classList.add("form-field");

    const label = document.createElement("label");
    label.textContent = "Text Input: ";
    const uniqueId = "text-input-" + new Date().getTime(); //unique id for each input
    label.for = uniqueId;

    const input = document.createElement("input");
    input.type = "text";
    input.name = "text-input";
    input.id = uniqueId;

    div.appendChild(label);
    div.appendChild(input);

    return div;
}

function createCheckbox() {
    const div = document.createElement("div");
    div.classList.add("form-field");

    const label = document.createElement("label");
    label.textContent = "Checkbox: ";
    const uniqueId = "checkbox-" + new Date().getTime();  // Unique ID for each checkbox
    label.for = uniqueId;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    checkbox.id = uniqueId;

    div.appendChild(checkbox);
    div.appendChild(label);

    return div;
}

function createRadioButton() {
    const div = document.createElement("div");
    div.classList.add("form-field");

    const label = document.createElement("label");
    label.textContent = "Radio Button: ";
    const uniqueId = "radio-" + new Date().getTime();  // Unique ID for each radio button
    label.for = uniqueId;

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "radio-group";
    radio.id = uniqueId;

    div.appendChild(radio);
    div.appendChild(label);

    return div;
}

function updateFormHTML(form) {
    // body...
    const formMarkup = form.innerHTML.trim();
    document.getElementById("form-html").textContent = formMarkup;
}

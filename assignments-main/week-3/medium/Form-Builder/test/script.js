const addTextBtn = document.getElementById("addText");
const addCheckboxBtn = document.getElementById("addCheckbox");
const addRadioBtn = document.getElementById("addRadio");
const saveFormBtn = document.getElementById("saveForm");
const loadFormBtn = document.getElementById("loadForm");
const formPreview = document.getElementById("formPreview");

let fieldCount = 1;

// Helper: Create Remove Button
function createRemoveButton(wrapper) {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.type = "button";
    removeBtn.style.marginLeft = "10px";
    removeBtn.addEventListener("click", () => {
        formPreview.removeChild(wrapper);
    });
    return removeBtn;
}

// Add Text Field
addTextBtn.addEventListener("click", () => {
    const wrapper = document.createElement("div");
    wrapper.className = "form-field";

    const label = document.createElement("label");
    label.textContent = `Text Field ${fieldCount}`;

    const input = document.createElement("input");
    input.type = "text";
    input.name = `textfield${fieldCount}`;

    const removeBtn = createRemoveButton(wrapper);

    wrapper.appendChild(label);
    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(document.createElement("br"));

    formPreview.appendChild(wrapper);
    fieldCount++;
});

// Add Checkbox
addCheckboxBtn.addEventListener("click", () => {
    const value = prompt("Enter the value for the checkbox:");
    if (!value?.trim()) return;

    const wrapper = document.createElement("div");
    wrapper.className = "form-field";

    const label = document.createElement("label");
    label.textContent = value;

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = `checkboxfield${fieldCount}`;
    input.value = value;

    const removeBtn = createRemoveButton(wrapper);

    wrapper.appendChild(label);
    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(document.createElement("br"));

    formPreview.appendChild(wrapper);
    fieldCount++;
});

// Add Radio Button
addRadioBtn.addEventListener("click", () => {
    const value = prompt("Enter the value for the radio button:");
    if (!value?.trim()) return;

    const wrapper = document.createElement("div");
    wrapper.className = "form-field";

    const label = document.createElement("label");
    label.textContent = value;

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "radioGroup"; // All radios share same group
    input.value = value;

    const removeBtn = createRemoveButton(wrapper);

    wrapper.appendChild(label);
    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(document.createElement("br"));

    formPreview.appendChild(wrapper);
    fieldCount++;
});

// Drag-and-drop with Sortable.js
new Sortable(formPreview, {
    animation: 150,
    ghostClass: "dragging"
});

// Save form structure
saveFormBtn.addEventListener("click", () => {
    const data = getFormData();
    localStorage.setItem("savedForm", JSON.stringify(data));
    alert("Form saved successfully!");
});

// Load saved form
loadFormBtn.addEventListener("click", () => {
    const saved = localStorage.getItem("savedForm");
    if (!saved) {
        alert("No saved form found.");
        return;
    }

    const data = JSON.parse(saved);
    formPreview.innerHTML = ""; // Clear current preview

    data.forEach(field => {
        const wrapper = document.createElement("div");
        wrapper.className = "form-field";

        const label = document.createElement("label");
        label.textContent = field.label;

        const input = document.createElement("input");
        input.type = field.type;
        input.name = field.name;
        input.value = field.value || "";

        const removeBtn = createRemoveButton(wrapper);

        wrapper.appendChild(label);
        wrapper.appendChild(document.createElement("br"));
        wrapper.appendChild(input);
        wrapper.appendChild(removeBtn);
        wrapper.appendChild(document.createElement("br"));
        wrapper.appendChild(document.createElement("br"));

        formPreview.appendChild(wrapper);
    });
});

// Get form structure as JSON
function getFormData() {
    const fields = [...formPreview.children];
    return fields.map(field => {
        const input = field.querySelector("input");
        return {
            type: input?.type,
            label: field.querySelector("label")?.textContent,
            name: input?.name,
            value: input?.value
        };
    });
}

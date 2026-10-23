"use strict";

const form = document.getElementById("marksForm");
const result = document.getElementById("result");

const subjectIds = [
    "subject1",
    "subject2",
    "subject3",
    "subject4",
    "subject5"
];

// Clear previous validation errors and results
function clearMessages() {
    subjectIds.forEach(function (id, index) {
        document.getElementById("error" + (index + 1)).textContent = "";
        document.getElementById(id).classList.remove("invalid");
    });

    result.textContent = "";
    result.className = "";
}

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessages();

    const marks = [];
    let hasErrors = false;

    subjectIds.forEach(function (id, index) {
        const input = document.getElementById(id);
        const error = document.getElementById("error" + (index + 1));

        // Validation logic comes from calculator.js
        const validation = validateMark(input.value);

        if (!validation.valid) {
            error.textContent = validation.message;
            input.classList.add("invalid");
            hasErrors = true;
        } else {
            marks.push(validation.mark);
        }
    });

    // Stop if any subject has invalid input
    if (hasErrors) {
        result.textContent = "Please correct the errors above.";
        result.className = "failure";
        return;
    }

    // Calculation logic comes from calculator.js
    const calculation = calculateResult(marks);

    result.textContent =
        "Result: " + calculation.status +
        " | Total: " +
        calculation.total.toFixed(2).replace(/\.?0+$/, "") +
        " / 500" +
        " | Percentage: " +
        calculation.percentage.toFixed(2) + "%" +
        " | Highest Mark: " + calculation.maximum;

    result.className =
        calculation.status === "PASS" ? "success" : "failure";
});

// Handle reset
form.addEventListener("reset", function () {
    clearMessages();
});

// Clear individual errors while typing
subjectIds.forEach(function (id, index) {
    document.getElementById(id).addEventListener("input", function () {
        document.getElementById("error" + (index + 1)).textContent = "";
        this.classList.remove("invalid");
        result.textContent = "";
        result.className = "";
    });
});
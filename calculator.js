"use strict";

const PASS_MARK = 35;
const MIN_MARK = 0;
const MAX_MARK = 100;
const TOTAL_SUBJECTS = 5;
const MAX_TOTAL = TOTAL_SUBJECTS * MAX_MARK;

const DECIMAL_PATTERN = /^\d+(?:\.\d{1,2})?$/;

// Validate a single subject mark
function validateMark(rawValue) {
    const value = rawValue.trim();

    if (value === "") {
        return { valid: false, message: "Please enter marks." };
    }

    if (!DECIMAL_PATTERN.test(value)) {
        return {
            valid: false,
            message: "Enter a valid number (up to 2 decimals)."
        };
    }

    const mark = Number(value);

    if (!Number.isFinite(mark)) {
        return { valid: false, message: "Enter a valid number." };
    }

    if (mark < MIN_MARK) {
        return {
            valid: false,
            message: "Negative marks are not allowed."
        };
    }

    if (mark > MAX_MARK) {
        return {
            valid: false,
            message: "Marks cannot exceed 100."
        };
    }

    return { valid: true, mark: mark, message: "" };
}

// Calculate total, percentage, highest mark, and result
function calculateResult(marks) {
    const total = marks.reduce(function (sum, mark) {
        return sum + mark;
    }, 0);

    const percentage = (total / MAX_TOTAL) * 100;
    const maximum = Math.max(...marks);

    const passed = marks.every(function (mark) {
        return mark >= PASS_MARK;
    });

    return {
        total: total,
        percentage: percentage,
        maximum: maximum,
        status: passed ? "PASS" : "FAIL"
    };
}

// Export functions for Node.js tests.
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        validateMark,
        calculateResult
    };
}


//harmless comment
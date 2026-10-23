
"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
    validateMark,
    calculateResult
} = require("./calculator.js");

// ===================================
// VALIDATION TESTS
// ===================================

test("Empty input should be rejected", function () {
    const result = validateMark("");

    assert.equal(result.valid, false);
    assert.equal(result.message, "Please enter marks.");
});

test("Whitespace-only input should be rejected", function () {
    const result = validateMark("   ");

    assert.equal(result.valid, false);
    assert.equal(result.message, "Please enter marks.");
});

test("Negative marks should be rejected", function () {
    const result = validateMark("-10");

    assert.equal(result.valid, false);
    assert.equal(result.message, "Enter a valid number (up to 2 decimals).");
});

test("Marks greater than 100 should be rejected", function () {
    const result = validateMark("101");

    assert.equal(result.valid, false);
    assert.equal(result.message, "Marks cannot exceed 100.");
});

test("Zero should be accepted", function () {
    const result = validateMark("0");

    assert.equal(result.valid, true);
    assert.equal(result.mark, 0);
});

test("Exactly 35 should be accepted", function () {
    const result = validateMark("35");

    assert.equal(result.valid, true);
    assert.equal(result.mark, 35);
});

test("Exactly 100 should be accepted", function () {
    const result = validateMark("100");

    assert.equal(result.valid, true);
    assert.equal(result.mark, 100);
});

test("Decimal marks should be accepted", function () {
    const result = validateMark("35.5");

    assert.equal(result.valid, true);
    assert.equal(result.mark, 35.5);
});

test("Two decimal places should be accepted", function () {
    const result = validateMark("89.75");

    assert.equal(result.valid, true);
    assert.equal(result.mark, 89.75);
});

test("More than two decimal places should be rejected", function () {
    const result = validateMark("35.555");

    assert.equal(result.valid, false);
});

test("Non-numeric text should be rejected", function () {
    const result = validateMark("hello");

    assert.equal(result.valid, false);
});

test("Multiple decimal points should be rejected", function () {
    const result = validateMark("35.5.5");

    assert.equal(result.valid, false);
});

test("Numeric notation such as Infinity should be rejected", function () {
    assert.equal(validateMark("Infinity").valid, false);
});

test("Leading and trailing whitespace should be accepted", function () {
    const result = validateMark(" 75 ");

    assert.equal(result.valid, true);
    assert.equal(result.mark, 75);
});

// ===================================
// CALCULATION TESTS
// ===================================

test("All subjects at or above 35 should PASS", function () {
    const result = calculateResult([35, 40, 50, 60, 70]);

    assert.equal(result.status, "PASS");
    assert.equal(result.total, 255);
    assert.equal(result.percentage, 51);
    assert.equal(result.maximum, 70);
});

test("One subject below 35 should FAIL", function () {
    const result = calculateResult([80, 75, 30, 65, 70]);

    assert.equal(result.status, "FAIL");
    assert.equal(result.total, 320);
    assert.equal(result.percentage, 64);
    assert.equal(result.maximum, 80);
});

test("All subjects at 35 should PASS", function () {
    const result = calculateResult([35, 35, 35, 35, 35]);

    assert.equal(result.status, "PASS");
    assert.equal(result.total, 175);
    assert.equal(result.percentage, 35);
});

test("A mark of 34.99 should cause FAIL", function () {
    const result = calculateResult([34.99, 80, 80, 80, 80]);

    assert.equal(result.status, "FAIL");
});

test("All subjects at 100 should produce 100 percent", function () {
    const result = calculateResult([100, 100, 100, 100, 100]);

    assert.equal(result.status, "PASS");
    assert.equal(result.total, 500);
    assert.equal(result.percentage, 100);
    assert.equal(result.maximum, 100);
});

test("Zero marks should produce FAIL and zero percent", function () {
    const result = calculateResult([0, 0, 0, 0, 0]);

    assert.equal(result.status, "FAIL");
    assert.equal(result.total, 0);
    assert.equal(result.percentage, 0);
    assert.equal(result.maximum, 0);
});

test("Highest mark should be calculated correctly", function () {
    const result = calculateResult([45, 92, 67, 81, 50]);

    assert.equal(result.maximum, 92);
});

test("Decimal marks should calculate percentage correctly", function () {
    const result = calculateResult([35.5, 40.5, 50, 60, 70]);

    assert.equal(result.total, 256);
    assert.equal(result.percentage, 51.2);
    assert.equal(result.status, "PASS");
});

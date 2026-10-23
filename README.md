# Marks Simple Calculator

A simple, beginner-friendly marks calculator built using **HTML, CSS, and JavaScript**. It validates student marks, calculates the total and percentage, identifies the highest mark, and displays the final PASS or FAIL result.

## Features

- Calculate total marks for 5 subjects.
- Calculate percentage out of 500.
- Display the highest mark.
- Display PASS or FAIL based on subject-wise marks.
- Validate empty inputs, negative marks, and marks above 100.
- Accept decimal marks up to two decimal places.
- Display field-specific validation errors.
- Reset the calculator.
- Automated tests using Node.js's built-in test runner.
- Continuous Integration (CI) and Continuous Deployment (CD) using GitHub Actions.
- Deploy the website to GitHub Pages.

## Validation Rules

| Test case | Expected behavior |
|---|---|
| Empty input | Reject and display an error |
| Negative marks | Reject |
| Marks greater than 100 | Reject |
| Non-numeric input | Reject |
| More than two decimal places | Reject |
| `0` marks | Accept |
| `35` marks | Accept; meets the passing threshold |
| `100` marks | Accept |
| Decimal marks | Accept up to two decimal places |

## Pass/Fail Criteria

A student passes only if **all five subjects have marks of at least 35**.

- **PASS:** Every subject has 35 or more marks.
- **FAIL:** At least one subject has less than 35 marks.

The percentage is calculated independently of the pass/fail status.

**Formula:**

Percentage = (Total Marks / 500) × 100

## Example

| Subject | Marks |
|---|---:|
| Subject 1 | 80 |
| Subject 2 | 75 |
| Subject 3 | 30 |
| Subject 4 | 65 |
| Subject 5 | 70 |
| **Total** | **320 / 500** |
| **Percentage** | **64.00%** |
| **Result** | **FAIL** |

Although the percentage is 64%, the student fails because Subject 3 has fewer than 35 marks.

## Technologies Used

- HTML5 — Structure
- CSS3 — Styling and responsive layout
- JavaScript — Validation and calculations
- Node.js — Automated testing
- GitHub Actions — CI/CD automation
- GitHub Pages — Website hosting

## Project Structure

```text
marks_simple_calculator/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── index.html
├── style.css
├── calculator.js
├── script.js
├── calculator_test.js
└── README.md
```

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Nikhil-Pareeshwad/marks_simple_calculator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd marks_simple_calculator
   ```

3. Open `index.html` in your browser.

No additional frontend packages are required.

## Run Automated Tests

Install [Node.js](https://nodejs.org/) if it is not already installed.

Run the test suite from the project directory:

```bash
node --test calculator_test.js
```

The test suite checks input validation, pass/fail conditions, total marks, percentage, and highest marks.

## Continuous Integration (CI)

The GitHub Actions CI workflow runs the automated tests when code is pushed or a pull request is opened against the configured branches.

If a test fails, the workflow reports a failure.

## Continuous Deployment (CD)

The deployment workflow publishes the website to GitHub Pages after the automated tests pass on a push to the `main` branch.

To enable deployment:

1. Open the repository's **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, set the source to **GitHub Actions**.
4. Push your changes to `main`.
5. Check the **Actions** tab for deployment status.

### Live Demo

Once GitHub Pages deployment succeeds, the website should be available at:

https://nikhil-pareeshwad.github.io/marks_simple_calculator/

## Future Improvements

- Add subject names and configurable passing marks.
- Display individual subject results.
- Add a print-friendly marks report.
- Improve accessibility and mobile responsiveness.
- Add browser-based automated UI tests.

## License

This project is intended for educational and learning purposes. Add a license file if you want to specify reuse and distribution terms.

---

**Author:** Nikhil Pareeshwad

**Project:** Marks Simple Calculator

# TestTaskDmytro

This is an automated testing project using [Cypress](https://www.cypress.io/), a JavaScript-based end-to-end testing framework. This README provides instructions for setting up and running the project.

Task 1 test could be found in [test_task_spec.cy.js](cypress/e2e/test_task_spec.cy.js)

Task 2 result could be found in [sqlTestQuery.sql](sqlTestQuery.sql)
## Table of Contents

1. [Project Setup](#project-setup)
2. [Running Tests](#running-tests)
---

## Project Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies:**

   Ensure you have [Node.js](https://nodejs.org/en/) installed. Then, install project dependencies:

   ```bash
   npm install
   ```

## Running Tests

1. To execute all tests:

    ```bash
    npx cypress run
    ```

2. Run tests in interactive mode:

    ```bash
    npx cypress open
    ```

For more detailed documentation, please refer to the [Cypress Documentation](https://docs.cypress.io/).

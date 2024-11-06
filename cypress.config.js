const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 5000,
    requestTimeout: 5000,
    pageLoadTimeout: 5000,
    baseUrl: "https://ua.sinoptik.ua",
  },
});

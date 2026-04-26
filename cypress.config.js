const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  viewportWidth: 1536,
  viewportHeight: 960,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
     specPattern: '**/*.spec.ts'
  },
});

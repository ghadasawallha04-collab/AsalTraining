const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  viewportWidth: 1536,
  viewportHeight: 960,
  defaultCommandTimeout: 10000,
  e2e: {
    retries: {
      runMode:2,
      openMode:1
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
     specPattern: '**/*.spec.ts'
  },
});

# Playwright - Cucumber -JS with POM
This is a simple test automation project for SkyMind Asset Management web applications. It's build with Playwright, Cucumber and Javascript using Page Object Model(POM) framework.

# Folder Structure
- src
    - test
        - pages : This folder will contain the page objects for the application
        - features :  This folder contains the test scenarios.
        - steps : This folder contain the step definitions for feature file steps.
        - hooks : This folder contains the files for initial setup and tear down.
    - reports : This folder contains the results of execution
- cucumber.json : This file contains configuration for the framework.
- index.js : This file is used to generate cucumber html reports.
- package.json

## Run the tests

Run the below command to import the playwright & cucumber packages 
- `npm init`

To run all the tests use below command in terminal 
- `npx cucumber-js`

To generate report , run below command
- `node index.js`

Note: the test will run in headed mode and on chromium browsers 


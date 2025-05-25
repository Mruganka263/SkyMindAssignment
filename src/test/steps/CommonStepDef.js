const { Given, When } = require('@cucumber/cucumber');

Given('User is able to successfully login to the application', async function () {
    await this.loginPage.launchURL()
    await this.loginPage.loginToTheApplication("temp_user2@company2.com", "eqZ19#2!$%Irw%Gn")
});

When('User select filter {string}', async function (filterName) {
    await this.pageObj.applyFilter(filterName)
});

When('User deselect filter {string}', async function (filterName) {

    await this.pageObj.removeFilter(filterName)
});
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, request } = require("@playwright/test");
const shareState = require('../hooks/shareState')
const payload = { value: "" };

When('User send a POST request for reseting the filter', async function () {
    let resetUrl = "https://api.test.skymind.com/users/preferences/filter";
    const apiContext = await request.newContext();
    const token = "Bearer " + shareState.bearerToken;
    console.log("\nToken : " + token);

    this.resp = await apiContext.post(resetUrl,
        {
            data: payload,
            headers: {
                'Authorization': token,
                'Content-type': 'application/json',
            }
        })
});

When('API call got success with status code {int}', async function (int) {
    // const respBody = JSON.parse(await response.json());
    console.log("\nStatus : " + await this.resp.status());
    expect(this.resp.ok()).toBeTruthy();
});

Then('{string} filter should be enabled', async function (filterName) {
    await this.page.reload();
    await this.pageObj.checkFilterIsEnabled(filterName);
});

Then('{string} filter should be disabled', async function (filterName) {
    await this.page.reload();
    await this.pageObj.checkFilterIsDisabled(filterName);
});
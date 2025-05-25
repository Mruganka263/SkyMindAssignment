const { Given, Then } = require('@cucumber/cucumber');

Given('Open {string} under Asset Management', async function (webPage) {

    if (webPage === "Logger in Table View") {
        this.pageObj = this.poManager.getLoggerPageObj();
        await this.pageObj.launchLoggerTableViewPage();
    }
    else if (webPage === "Asset in Table View") {
        this.pageObj = this.poManager.getAssetPageObj();
        await this.pageObj.launchAssetTableViewPage();
    }
    else {
        throw new Error('Incorrect webpage: "' + webPage + '" passed in the feature file')
    }
});

Then('Verify whether table results are filtered based on {string} as {string}', async function (filterType,filterName) {
    // await this.page.pause(); 
    await this.pageObj.verifyTableResultBasedOnFilter(filterType,filterName);
});


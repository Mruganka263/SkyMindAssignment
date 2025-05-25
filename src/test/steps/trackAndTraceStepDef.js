const { Given } = require('@cucumber/cucumber');

Given('Open {string} under Track & Trace', async function (webPage) {

    if (webPage === "Shipments in Table View") {
        this.pageObj = this.poManager.getTrackAndTracePageObj();
        await this.pageObj.launchShipmentsTableViewPage();
    }

    else {
        throw new Error('Incorrect webpage: "' + webPage + '" passed in the feature file')
    }
});

Given('Reset the filter if applicable', async function () {
    await this.page.pause();
    await this.pageObj.resetFilter();
});
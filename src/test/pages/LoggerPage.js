const { expect } = require("@playwright/test");
class LoggerPage {

    constructor(page) {
        this.page = page;
        this.menuListItem = this.page.locator("li.MuiListItem-root");
        this.pairingStatusValues = this.page.locator("[data-field='pairingStatus'][role='gridcell']");
    }

    async launchLoggerTableViewPage() {
        await this.page.goto("https://cloud.test.skymind.com/asset-management/loggers?view=table");
        await this.page.waitForLoadState()
    }

    async applyFilter(filterName) {
        let listItem = await this.menuListItem.filter({ has: this.page.locator(':text-is("' + filterName + '")') });
        await listItem.locator("[type='checkbox']").click();
        await this.page.waitForLoadState();
    }

    async verifyTableResultBasedOnFilter(filterType, filterName) {
        if (filterType == "Pairing Status") {
            await this.page.waitForResponse(response =>
                response.url().includes('/users/preferences/filter') && response.status() === 200
            );
            console.log("\nFilter Type: " + filterType + " Filtered By: " + filterName);
            let recordCount = await this.pairingStatusValues.count();
            console.log("Total Record: " + recordCount);
            for (let i = 0; i < recordCount; i++) {
                let text = await this.pairingStatusValues.nth(i).textContent();
                console.log("Compare with the Table Record: " + text);
                await expect(this.pairingStatusValues.nth(i)).toHaveText(filterName);
            }
        }
    }
} module.exports = { LoggerPage }
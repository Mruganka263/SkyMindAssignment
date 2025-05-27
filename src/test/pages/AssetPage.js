const { expect } = require("@playwright/test");
class AssetPage {
    constructor(page) {
        this.page = page;
        this.menuListItem = this.page.locator("li.MuiListItem-root");
        this.assetTypeValue = this.page.locator("[data-field='assetTypeCode'][role='gridcell']");
    }

    async launchAssetTableViewPage() {
        await this.page.goto("https://cloud.test.skymind.com/asset-management/assets?view=table");
    }

    async applyFilter(filterName) {
        await this.menuListItem.filter({ has: this.page.locator(':text-is("' + filterName + '")') }).locator("[type='checkbox']").click();
    }

    async verifyTableResultBasedOnFilter(filterType, filterName) {
        if (filterType == "Asset Type") {
            await this.page.waitForResponse(response =>
                response.url().includes('/users/preferences/filter') && response.status() === 200
            );
            console.log("\nFilter Type: " + filterType + " Filtered By: " + filterName);
            let recordCount = await this.assetTypeValue.count();
            console.log("Total Record: " + recordCount);
            for (let i = 0; i < recordCount; i++) {
                let text = await this.assetTypeValue.nth(i).textContent();
                console.log("Compare with the Table Record: " + text);
                await expect(this.assetTypeValue.nth(i)).toHaveText(filterName);
            }
        }
    }

    async checkFilterIsEnabled(filterName) {
        let filter = this.menuListItem.filter({ has: this.page.locator(':text-is("' + filterName + '")') }).locator("[type='checkbox']");
        expect(await filter.isChecked()).toBeTruthy();
    }

    async checkFilterIsDisabled(filterName) {
        let filter = this.menuListItem.filter({ has: this.page.locator(':text-is("' + filterName + '")') }).locator("[type='checkbox']");
        expect(await filter.isChecked()).toBeFalsy();
    }

} module.exports = { AssetPage }
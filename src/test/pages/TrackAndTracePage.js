const { expect } = require("@playwright/test");
class TrackAndTracePage {
    constructor(page) {
        this.page = page;
        this.menuListItem = this.page.locator("li.MuiListItem-root");
        this.recStatuses = this.page.locator("[data-field='status'][role='gridcell']");
        this.clearFilter = this.page.locator("button:has-text('Clear Filters')")
    }

    async launchShipmentsTableViewPage() {
        await this.page.goto("https://cloud.test.skymind.com/track-and-trace/shipments?view=table");
    }

    async applyFilter(filterName) {
        let checkbox = await this.menuListItem.filter({ hasText: filterName }).locator("[type='checkbox']")
        await checkbox.click();
    }

    async removeFilter(filterName) {
        let checkbox = this.menuListItem.filter({ has: this.page.locator(':text-is("' + filterName + '")') }).locator("[type='checkbox']");
        if (await checkbox.isChecked())
            await checkbox.click();
    }

    async verifyTableResultBasedOnFilter(filterType, filterName) {
        if (filterType == "Status") {
            await this.page.waitForResponse(response =>
                response.url().includes('/users/preferences/filter') && response.status() === 200
            );
            console.log("\nFilter Type: " + filterType + " Filtered By: " + filterName);
            let recordCount = await this.recStatuses.count();
            console.log("Total Record: " + recordCount);
            for (let i = 0; i < recordCount; i++) {
                let text = await this.recStatuses.nth(i).textContent();
                console.log("Compare with the Table Record: " + text);
                await expect(this.recStatuses.nth(i)).toHaveText(filterName);
            }
        }
    }

    async resetFilter() {
        if (await this.clearFilter.isEnabled()) {
            await this.clearFilter.click();
        }
    }
} module.exports = { TrackAndTracePage }
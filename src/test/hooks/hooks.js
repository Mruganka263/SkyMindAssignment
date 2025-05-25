const { Before, After, AfterStep } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { POManager } = require('../pages/POManager');
const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000);

Before(async function () {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        this.page = await context.newPage();

        this.poManager = new POManager(this.page);
        this.loginPage = this.poManager.getLoginPageObj(this.page);
})

After(async function () {
        await this.page.close();
})

AfterStep(async function ({ pickle, result }) {
        // Only capture screenshots if a page is available and step did something
        if (this.page.waitForLoadState() && result?.status !== 'skipped') {
                const buffer = await this.page.screenshot({ fullPage: true });

                // Attach screenshot to report
                await this.attach(buffer, 'image/png');
        }
});
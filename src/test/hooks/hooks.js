const { BeforeAll, Before, After, AfterStep, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { POManager } = require('../pages/POManager');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const shareState = require('./shareState');

setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
        shareState.browser = await chromium.launch({ headless: false });
        shareState.webContext = await shareState.browser.newContext();
        let page = await shareState.webContext.newPage();

        let poManager = new POManager(page);
        let loginPage = poManager.getLoginPageObj(page);
        await loginPage.launchURL()

        /**
         * Capturing response token after first login  
         */
        const [response] = await Promise.all([
                page.waitForResponse(resp =>
                        resp.url().includes('/realms/secure-test/protocol/openid-connect/token') && resp.status() === 200),
                loginPage.loginToTheApplication("temp_user2@company2.com", "eqZ19#2!$%Irw%Gn")
        ]);

        /**
         * Storing access token
         */
        const json = await response.json();
        shareState.bearerToken = json.access_token;

        /*
        Storing the session and cookie details 
        */
        await shareState.webContext.storageState({ path: 'state.json' });

})

Before(async function () {
        /*
        * Opening browser with using same session id , instead of login 
        */
        shareState.browser = await chromium.launch({ headless: false });
        shareState.webContext = await shareState.browser.newContext({ storageState: 'state.json', viewport: { width: 1440, height: 900 } })
        this.page = await shareState.webContext.newPage();
        this.poManager = new POManager(this.page);
})

After(async function () {
        await this.page.close();
})

AfterStep(async function ({ pickle, result }) {
        // Only capture screenshots if a page is available and step did something
        if (this.page.waitForLoadState('domcontentloaded') && result?.status !== 'skipped') {
                const buffer = await this.page.screenshot({ fullPage: true });
                this.attach(buffer, 'image/png');
        }
});
AfterAll(async function () {
        await shareState.webContext.close();
        await shareState.browser.close();
})
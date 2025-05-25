class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator("[name='username']");
        this.password = page.locator("[name='password']");
        this.loginButton = page.locator("[type='submit']");
    }

    async launchURL() {
        await this.page.goto("https://cloud.test.skymind.com/");
    }

    async loginToTheApplication(usrnm, pwd) {
        await this.username.fill(usrnm);
        await this.password.fill(pwd);
        await this.loginButton.click();
    }
} module.exports = { LoginPage }
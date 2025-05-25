const { AssetPage } = require("./AssetPage");
const { LoggerPage } = require("./LoggerPage");
const { LoginPage } = require("./LoginPage")
const { TrackAndTracePage } = require('../pages/TrackAndTracePage');

class POManager {

    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page);
        this.loggerPage = new LoggerPage(this.page);
        this.assetPage = new AssetPage(this.page);
        this.trackTrace = new TrackAndTracePage(this.page)
    }

    getLoginPageObj() {
        return this.loginPage;
    }

    getLoggerPageObj() {
        return this.loggerPage;
    }

    getAssetPageObj() {
        return this.assetPage;
    }

    getTrackAndTracePageObj() {
        return this.trackTrace;
    }
}
module.exports = { POManager }
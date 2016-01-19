'use strict';

const { should } = require('../support/setup');

const wd = require('wd');
const serverConfigs = require('../support/appium-servers');

describe('Menu tests', function () {
  this.timeout(200000);
  let driver;

  beforeEach(function () {
    const serverConfig = serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);

    const desired = {
      ...require('../support/caps').android19,
      app: require('../support/apps').androidDemo
    };

    return driver
      .init(desired)
      .setImplicitWaitTimeout(2000);
  });

  afterEach(function () {
    return driver.quit();
  });

  it('renders menu', () => {
    return driver
      .elementByXPath('//android.widget.TextView[@text=\'OPEN FIRST MENU\']')
      .click()
      .elementByXPath('//android.widget.TextView[@text=\'Normal option\']')
      .should.eventually.exist;
  });

  it('invokes callback when option is selected', () => {
    return driver
      .elementByXPath('//android.widget.TextView[@text=\'OPEN FIRST MENU\']')
      .click()
      .elementByXPath('//android.widget.TextView[@text=\'Normal option\']')
      .click()
      .elementByXPath('//android.widget.TextView[@text=\'You selected "normal"\']')
      .should.eventually.exist;
  });

  it('does not open menu for disabled triggers', () => {
    return driver
      .elementByXPath('//android.widget.TextView[@text=\'OPEN SECOND MENU\']')
      .click()
      .elementByXPath('//android.widget.TextView[@text=\'disable first menu\']')
      .click()
      .elementByXPath('//android.widget.TextView[@text=\'OPEN FIRST MENU\']')
      .click()
      .elementsByAndroidUIAutomator('new UiSelector().text("You selected \"normal\"")')
      .should.eventually.be.empty;
  });
});

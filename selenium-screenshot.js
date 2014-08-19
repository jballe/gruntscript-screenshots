'use strict';

module.exports = function(url, filename) {
  var webdriver = require('selenium-webdriver');
  var fs = require('fs');

  var driver = new webdriver.Builder()
              .withCapabilities(webdriver.Capabilities.chrome())
              .build()
              ;

  driver.get(url);
  driver.takeScreenshot().then(function(data) {
    fs.writeFileSync(filename+'.png', data, 'base64');
    driver.quit();
  });

};

module.exports = {
  'Index page shows up.': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.title', 'Universal Vue.js Application Framework')
      .end()
  }
}

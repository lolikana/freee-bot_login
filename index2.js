require('chromedriver');

const { Builder, By, Key } = require('selenium-webdriver');
let browser = new Builder();
let driver = browser.forBrowser('chrome').build();

// Get the credentials from the JSON file
let { email, password } = require('./credentials.json');

f(email, password);

// Step 1 - Opening the geeksforgeeks sign in page
async function f(email, password) {
  await driver.get(
    'https://docs.google.com/spreadsheets/d/1u-ReefzgcKtzLHwgCZp4DLVZXWxKu7LLD8sUKyEGDXg/edit#gid=260270109'
  );
  // Timeout to wait if connection is slow
  await driver.manage().setTimeouts({
    implicit: 10000,
    pageLoad: 10000 // 10 seconds
  });
  // 2 - username input
  let usernameInput = await driver.findElement(By.css('#identifierId'));
  await usernameInput.sendKeys(email);

  // 3 - password input
  let next = driver.findElement(By.css('#identifierNext'));
  await next.click();

  let passwordInput = await driver.findElement(By.css('[name="Passwd"]'));
  await passwordInput.sendKeys(password);

  let next2 = driver.findElement(By.css('#passwordNext'));
  await next2.click();

  // await driver.findElement(By.css('#docs-aria-speakable'));

  const input = await driver.findElement(By.css('.cell-input'));
  const ele = await driver.wait(() => input.isEnabled());

  if (ele) {
    driver
      .actions()
      .keyDown(Key.META)
      .keyDown(Key.ALT)
      .keyDown(Key.SHIFT)
      .sendKeys(Key.NUMPAD1)
      .keyUp(Key.META)
      .keyUp(Key.ALT)
      .keyUp(Key.SHIFT)
      .perform();
  }
}

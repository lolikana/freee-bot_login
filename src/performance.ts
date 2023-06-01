import 'chromedriver';
import { Builder, By, Key } from 'selenium-webdriver';

let browser = new Builder();

// Step 1 - Opening the geeksforgeeks sign in page
async function Performance(email: string, password: string) {
  let driver = browser.forBrowser('chrome').build();
  await driver.get(
    'https://docs.google.com/spreadsheets/d/1ps411YwOZ-ZIIPhWh3J6y25z9eRpWWyDydA_NTD9h88/edit#gid=1493853613'
  );
  // Timeout to wait if connection is slow
  await driver
    .manage()
    .setTimeouts({
      implicit: 20000,
      pageLoad: 20000
    })
    .catch(err => {
      console.log('Performance timeout: ', err);
      driver.close();
    });

  // 2 - username input
  let usernameInput = await driver.findElement(By.css('#identifierId'));
  await usernameInput.sendKeys(email).catch(err => {
    console.log('Performance username input: ', err);
    driver.close();
  });

  // 3 - password input
  let next = driver.findElement(By.css('#identifierNext'));
  await next.click().catch(err => {
    console.log('Performance next button: ', err);
    driver.close();
  });

  let passwordInput = await driver.findElement(By.css('[name="Passwd"]'));
  await passwordInput.sendKeys(password).catch(err => {
    console.log('Performance password input: ', err);
    driver.close();
  });

  let next2 = driver.findElement(By.css('#passwordNext'));
  await next2.click().catch(err => {
    console.log('Performance next button 2: ', err);
    driver.close();
  });

  const speak = await driver.findElement(By.css('#docs-folder')).catch(err => {
    console.log('Performance next speak: ' + err);
    driver.close();
  });

  const input = await driver.findElement(By.css('.cell-input')).catch(err => {
    console.log('Performance next input: ' + err);
    driver.close();
  });

  const ele = await driver
    .wait(async () => (await input?.isEnabled()) && speak?.isEnabled())
    .then(res => res)
    .catch(err => {
      console.log('Performance element page: ' + err);
      driver.close();
    });

  if (ele) {
    setTimeout(() => {
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

      setTimeout(() => {
        driver.close();
      }, 10000);
    }, 10000);
  }
}

export default Performance;

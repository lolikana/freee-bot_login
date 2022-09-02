// Include the chrome driver
require('chromedriver');

// Include selenium webdriver
let swd = require('selenium-webdriver');
let browser = new swd.Builder();
let driver = browser.forBrowser('chrome').build();

// Get the credentials from the JSON file
let { email, password } = require('./credentials.json');

// Step 1 - Opening the geeksforgeeks sign in page
async function f(email, password) {
  await driver.get('https://accounts.secure.freee.co.jp/login/hr');
  // Timeout to wait if connection is slow
  await driver.manage().setTimeouts({
    implicit: 10000 // 10 seconds
  });
  // 2 - username input
  let promiseUsernameBox = await driver.findElement(swd.By.css('#user_email'));
  await promiseUsernameBox.sendKeys(email);

  // 3 - password input
  let promisePasswordBox = await driver.findElement(swd.By.css("[type='password']"));
  await promisePasswordBox.sendKeys(password);

  // 4 - signin button
  let promiseSignInBtn = driver.findElement(
    swd.By.css('.btn.btn-primary.login-page-button.login-button.transition')
  );
  await promiseSignInBtn.click();

  // 5 - attendance tab
  let promiseAttendanceBtn = driver.findElement(swd.By.css("a[data-guide='勤怠'"));
  await promiseAttendanceBtn.click();

  // //! erase in september !//
  // let test = driver.findElement(swd.By.css('button[data-test="年月ナビ_2022-10"]'));
  // await test.click();

  // // 6 - select first day of the month
  // const currYear = new Date().getFullYear();
  // const currMonth = new Date().getMonth();
  // let inputMonth;
  // if (currMonth !== 11) {
  //   inputMonth = `0${+currMonth + 2}`;
  // } else {
  //   inputMonth = '01';
  // }

  // let promiseFirstDayBtn = driver.findElement(
  //   swd.By.css(`[data-date="${currYear}-${inputMonth}-01"]`)
  // );

  // await promiseFirstDayBtn.click();

  // //! erase in september !//

  // 6 - select first day of the month
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
  let inputMonth;
  if (currMonth !== 11) {
    inputMonth = `0${+currMonth + 1}`;
  } else {
    inputMonth = '01';
  }

  let promiseFirstDayBtn = driver.findElement(
    swd.By.css(`[data-date="${currYear}-${inputMonth}-01"]`)
  );

  await promiseFirstDayBtn.click();

  //TODO から
  // 7 - click "next" button until end of the month
  let promiseSaveBtn = driver.findElement(
    swd.By.css('.work-record-edit-modal__footer-control.sw-button-primary')
  );

  async function click() {
    promiseSaveBtn;
    await promiseSaveBtn.click();
  }

  for (let i = 1; i < 5; i++) {
    await driver.wait(until.promiseSaveBtn.isEnabled());
    click();
  }
//TODO まで

  // await driver.close()
}
f(email, password);

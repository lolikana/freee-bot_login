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

  //! if want to enable next month !//
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

  //! if want to enable next month !//

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

  // 7 - check if continue checkbox is unchecked
  let promiseContinueCheckbox = driver.findElement(swd.By.css('.sw-checkbox-input'));
  if (!promiseContinueCheckbox.checked) {
    await promiseContinueCheckbox.click();
  }

  // 8 - click "next" button until end of the month
  let promiseSaveBtn = driver.findElement(
    swd.By.css('.work-record-edit-modal__footer-control.sw-button-primary')
  );

  const test = async () => {
    await promiseSaveBtn;
    await promiseSaveBtn.click();
    console.log('test 1: ', new Date());
  };

  let i = 0;
  while (i < 23) {
    if (await promiseSaveBtn.isEnabled()) {
      console.log(i);
      test();
      await promiseSaveBtn.isEnabled();
      i++;
    }
  }

  // 9 - close browser
  await driver.close();
}
f(email, password);

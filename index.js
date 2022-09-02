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
  // let attendanceMonth = driver.findElement(
  //   swd.By.css('button[data-test="年月ナビ_2022-2"]')
  // );
  // await attendanceMonth.click();
  //! if want to enable next month !//

  // 6 - select first day of work
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth();
  let inputMonth;
  if (currMonth !== 11) {
    inputMonth = `0${+currMonth + 1}`;
  } else {
    inputMonth = '01';
  }

  const workDayBoxClass = async day => {
    return await driver
      .findElement(swd.By.css(`[data-date="${currYear}-${inputMonth}-0${day}"]`))
      .getAttribute('class');
  };

  let i = 1;
  for (i; i < 10; i++) {
    if (
      (await workDayBoxClass(i)) !== 'day prescribed-holiday' &&
      (await workDayBoxClass(i)) !== 'day legal-holiday' &&
      (await workDayBoxClass(i)) !== 'day absent' &&
      (await workDayBoxClass(i)) !== 'day paid-holiday'
    )
      break;
  }

  await driver
    .findElement(swd.By.css(`[data-date="${currYear}-${inputMonth}-0${i}"]`))
    .click();

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
  };

  let j = 0;
  while (j < 23) {
    if (await promiseSaveBtn.isEnabled()) {
      test();
      await promiseSaveBtn.isEnabled();
      j++;
    }
  }

  // 9 - close browser
  await driver.close();
}
f(email, password);

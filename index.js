// Include the chrome driver
require('chromedriver');

// Include selenium webdriver
let swd = require('selenium-webdriver');
let browser = new swd.Builder();
let driver = browser.forBrowser('chrome').build();

// Get the credentials from the JSON file
let { email, password } = require('./credentials.json');

f(email, password);

// Step 1 - Opening the geeksforgeeks sign in page
async function f(email, password) {
  await driver.get('https://accounts.secure.freee.co.jp/login/hr');
  // Timeout to wait if connection is slow
  await driver.manage().setTimeouts({
    implicit: 10000 // 10 seconds
  });
  // 2 - username input
  let usernameInput = await driver.findElement(swd.By.css('#user_email'));
  await usernameInput.sendKeys(email);

  // 3 - password input
  let passwordInput = await driver.findElement(swd.By.css("[type='password']"));
  await passwordInput.sendKeys(password);

  // 4 - signin button
  let signInBtn = driver.findElement(
    swd.By.css('.btn.btn-primary.login-page-button.login-button.transition')
  );
  await signInBtn.click();

  // 5 - attendance tab
  let attendanceBtn = driver.findElement(swd.By.css("a[data-guide='勤怠'"));
  await attendanceBtn.click();

  //! Choose specific month !//
  // let selectAttendanceMonth = driver.findElement(
  //   swd.By.css('button[data-test="年月ナビ_2022-11"]')
  // );
  // await selectAttendanceMonth.click();
  // let inputMonth = '10';
  //! Choose specific month !//

  // 6 - select first day of work
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth();
  let inputMonth;
  if (currMonth === 0 || currMonth <= 8) {
    inputMonth = `0${+currMonth + 1}`;
  } else if (currMonth) {
    inputMonth = `${+currMonth + 1}`;
  }

  const workDayBoxClass = async day => {
    return await driver
      .findElement(swd.By.css(`[data-date="${currYear}-${inputMonth}-0${day}"]`))
      .getAttribute('class');
  };

  let i = 1;
  for (i; i < 22; i++) {
    if ((await workDayBoxClass(i)) === 'day' || (await workDayBoxClass(i)) === 'day work')
      break;
  }

  await driver
    .findElement(swd.By.css(`[data-date="${currYear}-${inputMonth}-0${i}"]`))
    .click();

  // 7 - check if continue checkbox is unchecked
  let continueCheckbox = driver.findElement(swd.By.css('.sw-checkbox-input'));
  if (!continueCheckbox.checked) {
    await continueCheckbox.click();
  }

  // 8 - click "next" button until end of the month
  let saveBtn = driver.findElement(
    swd.By.css('.work-record-edit-modal__footer-control.sw-button-primary')
  );

  const test = async () => {
    await saveBtn;
    await saveBtn.click();
  };

  let j = 0;
  while (j < 5) {
    if (await saveBtn.isEnabled()) {
      test();
      await saveBtn.isEnabled();
      j++;
    }
  }

  // 9 - close browser
  await driver.close();
}

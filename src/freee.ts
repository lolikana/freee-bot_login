// Include the chrome driver
import 'chromedriver';
import { Builder, By } from 'selenium-webdriver';

let browser = new Builder();

// Step 1 - Opening the geeksforgeeks sign in page
async function Freee(email: string, password: string) {
  let driver = browser.forBrowser('chrome').build();
  await driver.get('https://accounts.secure.freee.co.jp/login/hr');
  // Timeout to wait if connection is slow
  await driver
    .manage()
    .setTimeouts({
      implicit: 10000
    })
    .catch(err => {
      console.log(err);
      driver.close();
    });
  // 2 - username input
  let usernameInput = await driver.findElement(By.css('#login_id'));
  await usernameInput.sendKeys(email);

  // 3 - password input
  let passwordInput = await driver.findElement(By.css("[type='password']"));
  await passwordInput.sendKeys(password);

  // 4 - signin button
  let signInBtn = driver.findElement(
    By.css('.btn.btn-primary.login-page-button.login-button.transition')
  );
  await signInBtn.click();

  // 5 - attendance tab
  let attendanceBtn = driver.findElement(By.css("a[data-test='グロナビ_勤怠'"));
  await attendanceBtn.click();

  //! Choose specific month !//
  // let selectAttendanceMonth = driver.findElement(
  //   By.css('button[data-test="年月ナビ_2022-11"]')
  // );
  // await selectAttendanceMonth.click();
  // let inputMonth = '10';
  //! Choose specific month !//

  // 6 - select first day of work
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth();
  let inputMonth: string = '';
  if (currMonth === 0 || currMonth <= 8) {
    inputMonth = `0${+currMonth + 1}`;
  } else if (currMonth) {
    inputMonth = `${+currMonth + 1}`;
  }

  const workDayBoxClass = async (day: number) => {
    return await driver
      .findElement(By.css(`[data-date="${currYear}-${inputMonth}-0${day}"]`))
      .getAttribute('class');
  };

  let i = 1;
  for (i; i < 22; i++) {
    if (
      (await workDayBoxClass(i)) === 'day' ||
      (await workDayBoxClass(i)) === 'day work'
    )
      break;
  }

  await driver
    .findElement(By.css(`[data-date="${currYear}-${inputMonth}-0${i}"]`))
    .click();

  // 7 - check if continue checkbox is unchecked
  let continueCheckbox: any = await driver.findElement(
    By.css('.vb-checkbox__control')
  );

  if (!continueCheckbox.checked) {
    await continueCheckbox.click();
  }

  // 8 - click "next" button until end of the month
  let saveBtn = driver.findElement(
    By.css('.vb-button.vb-button--appearancePrimary')
  );

  const test = async () => {
    await saveBtn;
    await saveBtn.click();
  };

  let j = 0;
  while (j < 23) {
    if (await saveBtn.isEnabled()) {
      test();
      await saveBtn.isEnabled();
      j++;
    }
  }

  // 9 - close browser
  await driver.close();
}

export default Freee;

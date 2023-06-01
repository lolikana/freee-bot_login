// Include the chrome driver
import 'chromedriver';
import Freee from './freee.js';
import prompt from 'prompt';
import data from './credentials.json' assert { type: 'json' };

const properties = [
  {
    name: 'password',
    hidden: true
  }
];

prompt.start();

prompt.get(properties, (_err: unknown, result: { password: string }) => {
  // Get the credentials from the JSON file
  let email = data.email;

  if (result.password) {
    Freee(email, result.password).catch(err => console.log('free: ' + err));
  }
});

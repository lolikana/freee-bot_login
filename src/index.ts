// Include the chrome driver
import 'chromedriver';
import Freee from './freee.js';
import prompt from 'prompt';
import data from './credentials.json' assert { type: 'json' };
import Performance from './performance.js';

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
    Freee(email, result.password);
    Performance(email, result.password.toLowerCase());
  }
});

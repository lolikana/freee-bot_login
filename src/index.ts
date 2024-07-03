// Include the chrome driver
import 'chromedriver';
import Freee from './freee.js';
import prompt from 'prompt';
import data from './credentials.json' with { type: 'json' };
import 'dotenv/config';

const properties = [
  {
    name: 'password',
    hidden: true
  }
];

let email = data.email;

if (process.env.PASSWORD !== undefined && process.env.PASSWORD.length !== 0) {
  Freee(email, process.env.PASSWORD as string).catch(err => console.log('free: ' + err));
} else {
  prompt.start();
  prompt.get(properties, (_err: unknown, result: { password: string }) => {
    // Get the credentials from the JSON file
    if (result.password) {
      Freee(email, result.password).catch(err => console.log('free: ' + err));
    }
  });
}

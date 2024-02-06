// Include the chrome driver
import "chromedriver";
import Freee from "./freee.js";
import prompt from "prompt";
import data from "./credentials.json" assert { type: "json" };

const properties = [
  {
    name: "password",
    hidden: true,
  },
];

prompt.start();

let email = data.email;
let password = data.password;
if (password) {
  Freee(email, password).catch((err) => console.log("free: " + err));
} else {
  prompt.get(properties, (_err: unknown, result: { password: string }) => {
    // Get the credentials from the JSON file
    if (result.password) {
      Freee(email, result.password).catch((err) => console.log("free: " + err));
      return;
    }
  });
}

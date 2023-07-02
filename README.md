# freee-bot_login

The Freee-Bot Login is a script that automates the process of logging attendance in your personal Freee account. Freee is a cloud-based accounting and HR platform that provides businesses with various tools for managing attendance, payroll, and more. This bot specifically targets the attendance tab of the Freee platform and automatically inputs attendance data for each working day of the current month, excluding holidays and day-offs.

## Installation and Usage

### Method 1: Manual Setup

1. Clone this repository to your local machine:

`https://github.com/lolikana/freee-bot_login`

2. Install dependencies:

`npm install`

3. Update Chromedriver and Selenium-webdriver:

`npm run update`

4. Write your freee email <i>src/credentiales.json</i> 

```
{
  "email": "mail",
}

```

5. Creates a build directory  

`npm run build`

8. Run the script

`npm run run start`


### Method 2: Using the bot.sh script

1. Clone this repository to your local machine:

`https://github.com/lolikana/freee-bot_login`

2. Change directory from the bot.sh

`cd "/Path/to/you/clone/folder"`

3. Write your freee email <i>src/credentiales.json</i> 

```
{
  "email": "mail",
}

```

4. Make sure to open the Terminal and have the appropriate permissions.

If necessary, you can grant execution permission by running the following command:

 `chmod -x Path/to/your/bot.sh` 

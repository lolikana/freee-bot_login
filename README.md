# freee-bot_login

The Freee-Bot Login is a script that automates the process of logging attendance in your personal Freee account. Freee is a cloud-based accounting and HR platform that provides businesses with various tools for managing attendance, payroll, and more. This bot specifically targets the attendance tab of the Freee platform and automatically inputs attendance data for each working day of the current month, excluding holidays and day-offs.

## Table of Contents
- [Method 1: Manual Setup](#method-1)
- [Method 2: Using the bot.sh script](#method-2)

## Installation and Usage

<a name="method-1"></a>
- ### Method 1: Manual Setup

1. Clone the repository::

`https://github.com/lolikana/freee-bot_login`

2. Install dependencies:

`npm install`

3. Create <i>src/credentiales.json</i> and add your Freee email:

```
{
  "email": "mail",
}

```

4.(Optional) Create <i>.env</i> file and add your password:

```
PASSWORD="YOUR_PASSWORD"
```

5. Build the project:  

`npm run build`

6. Run the script

`npm run start`

7. If you skipped step 4, you'll be prompted to enter Freee your password

<a name="method-2"></a>
- ### Method 2: Using the bot.sh script

1. Clone the repository::

`https://github.com/lolikana/freee-bot_login`

2. Install dependencies:

`npm install`

3. Create <i>src/credentiales.json</i> and add your Freee email:

```
{
  "email": "mail",
}

```

4.(Optional) Create <i>.env</i> file and add your password:

```
PASSWORD="YOUR_PASSWORD"
```

5. Build the project:  

`npm run build`

6. Make sure to open the Terminal and have the appropriate permissions. Grant execution permission if needed:

 `chmod -x Path/to/your/bot.sh` 

7. (Optional) Copy the bot.sh file to your desired location.

8. Double click on bot.sh to execute the script.

9. If you skipped step 4, you'll be prompted to enter Freee your password


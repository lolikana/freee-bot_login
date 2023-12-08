#!/bin/sh

cd "/Users/Nodejs/freee-bot_login"
npm install 
npm run update
npm run build
node dist/index.js
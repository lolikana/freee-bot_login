#!/bin/sh

cd "/Users/NodeJS/bot_login"
npm install 
npm run update
npm run build
node dist/index.js

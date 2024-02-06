#!/bin/sh

cd "/Users/node_js/bot_login"
npm install 
npm run update
npm run build
node dist/index.js
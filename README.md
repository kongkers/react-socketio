# Seven Network Coding Challenge 
Deployed application is available for review at https://sevennetwork.excelera.com.au

# Notes
Instead of creating a page that accepts JSON data. I've created an actual form to submit the schedule data. This is stored in a local MongoDB. Note also that
this application uses socket.io so any changes you make will show in real time to other users who load the page.

You can test this by opening the application in several browser windows and adding or deleting a schedule. Any changes will be shown immediately in other browsers.

# Installation
Git clone https://github.com/kongkers/react-socketio.git

npm install

npm start

# Tests
npm test

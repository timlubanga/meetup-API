[![Build Status](https://travis-ci.org/timlubanga/meetup-API.svg?branch=ft-config)](https://travis-ci.org/timlubanga/meetup-API)
[![Maintainability](https://api.codeclimate.com/v1/badges/9d361d5c4107ff703758/maintainability)](https://codeclimate.com/github/timlubanga/meetup-API/maintainability)

# Configuration Steps

1. Ensure you have ***NODE and NPM*** packages installed

2. Clone the repository

3. Install the dependencies using ***npm install***

# Environment variables
For local development, you need to _export_ the following env vars:
1. export NODE_ENV="a node environment the api is running"
2. export SECRET="secret key for the app"
3. export PASS="mongo db password"
4. export SECRETKEY="a secret key for signing jwt token"
5. export USERNAME="gmail username"
6. export EXPIRES_IN="token expiration duration"
7. export PASSWORD="gmail service pass"
8. export SERVICE="email service for sending mails"

4. Run the app with **npm start** to spin up the local server

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
### This app powered by NestJs 🚀
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# Dial Me 📞

### Table of Contents

1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Environment Setup](#environment-setup)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Database](#database)
7. [Swagger Documentation](#swagger-documentation)
8. [Project Structure](#project-structure)
9. [Contributing](#contributing)
10. [License](#license)

## Project Overview

Dial Me is a comprehensive application that allows users to send SMS messages,
make phone calls, and handle OTP (One Time Password) verification using Twilio's API.
The application is built using NestJS for the backend and React for the frontend.

## Installation 📋

To install the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dial-me.git
   cd dial-me


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Environment Setup

Create a .env file in the backend directory with the following content:
```bash
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=dial_me
```

 # Swagger Documentation
### The API documentation is available at
```bash
http://localhost:3006/swagger
```
 <p>It provides detailed information about all the available endpoints and their usage</p> 




# Project Structure
 ### Backend
 - src 
   - twilio
   - twilio.controller.ts: Handles Twilio-related endpoints.
   - twilio.service.ts: Contains logic for sending SMS, making calls, and handling OTP.
 - users
   - users.controller.ts: Handles user-related endpoints.
   - users.service.ts: Contains logic for user management.
- entities
  - user.entity.ts: User entity definition.
  - otp.entity.ts: OTP entity definition.
  - core.entity.ts: Core entity definition with common fields.


### Frontend
 - src
   - components
     - CallMessage.js: Component for making calls and displaying call status.
   - pages
      - HomeComponent.js:
      - Home page component.
      - Login.js: Login page component.
      - SignUp.js: Sign-up page component.
   - App.js: Main application component.
   - index.js: Entry point for the React application.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Mohamed Khaled](https://linkedin.com/in/mohamed-nodejs-backend/)
- GitHub - [Bojo500](https://github.com/bojo500)


## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.


## License
This project is licensed under the MIT License. See the LICENSE file for more details.

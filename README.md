# MERN Ecommerce Application

[![Platform](https://img.shields.io/badge/frontend-react--v17.0.1-red)](https://github.com/facebook/react)
[![Platform](https://img.shields.io/badge/ui-material--ui--v4.11.1-blue)](https://github.com/mui-org/material-ui)
[![Platform](https://img.shields.io/badge/backend-express--v4.17.1-purple)](https://github.com/expressjs/express)

MERN **Ecommerce** project app. This is my first web application done with educational purposes in order to learn new concepts about web development such as global state management.

It's a basic online shop where a registered user can check and add products in the shopping cart and finally make the purchase through a Paypal account. Admin users are able to list and edit users, add new products (upload images from computer) and also approve purchase orders.

> [View demo](https://reproshop.herokuapp.com/) `admin@example.com / 123456`

## Technologies

I have chosen MERN stack due to its deployment easiness:

- **Database**: MongoDB Atlas + Mongoose
- **Backend**: API Express JS Framework (Node) + JWT Auth
- **Frontend**: React (JavaScript + Hooks) + Redux + Material-UI components and theming
- **Testing**: Frontend E2E tests with Cypress

For the the development process I decided to setup up Prettier + ESlint + Husky dependencies so as to assure an code format without broken rules in each git commit. Finally the website has been deployed on Heroku.

## Screenshot

![1](https://user-images.githubusercontent.com/49274799/115863639-0ab8bb00-a436-11eb-9fe3-83fd5d95cf21.JPG)

## Installation and run

Clone this repository and install dependencies for backend and frontend:

Before installing, [download and install Node.js](https://nodejs.org/en/download/) in case you don't have it. Node.js 10 or higher is required.

After installation is done, download all package.json dependencies with
[`npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

Backend (root index package.json) and inside frontend folder:

```bash
$ npm install
```

**Add .ENV file**

Make sure you create `.env file` in the root with the properly enviroment properties:

```
NODE_ENV = development
PORT = 5000
MONGO_URI = _YOUR MONGO DB URI
JWT_SECRET = _YOUR JWT SECRET CONSTANT
PAYPAL_CLIENT_ID = _YOUR PAYPAL CLIENT ID FROM PAYPAL DEVELOPER CENTER
```

Useful npm scripts:

> Run backend server and frontend:

```bash
$ npm run dev
```

> Script to seed mongo database with test data (./backend/data):

```bash
$ npm run data:import
```

> Script to destroy mongo database data (./backend/data):

```bash
$ npm run data:destroy
```

## Issues and missing features

The application has been developed following a tutorial from Udemy with some differences so as to adapt to my custom components and material-ui library. There are some minor bugs and writing review system couldn't be finished due to lack of time. In the future I would like to refactor some parts and apply redux-form.

## Support me

> Just **star** or **fork** this repository, and follow my github. You have _supported_ me!

## Author

[**David Mareca**](https://www.linkedin.com/in/davidme/)

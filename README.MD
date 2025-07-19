
# Auth + Profile Microservices

## Overview
Two microservices communicating via RabbitMQ:

- **Auth-Service**: User registration and login.
- **Profile-Service**: Creates user profiles on user registration events.

## Setup

- Run MongoDB and RabbitMQ servers.
- Install dependencies in each service folder with `npm install`.
- Create `.env` files with required config (MongoDB URI, RabbitMQ URL, JWT secret, PORT).
- Start services with `npm start`.

## How it works

- Auth-Service registers users and publishes `USER_REGISTERED` event.
- Profile-Service listens to this event and creates profiles.

## Technologies

Node.js, Express, MongoDB, RabbitMQ, bcrypt, JWT

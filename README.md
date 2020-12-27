# recipedia-backend

Simple, easy implementation of the private web API.

## About The Project

API build in [Express.js](https://expressjs.com/) and [MySQL](https://www.mysql.com/) for [SemediTeam/recipedia-frontend](https://github.com/SemediTeam/recipedia-frontend)

### Prerequisites

- [npm](https://nodejs.org/en/download/)
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/SemediTeam/recipedia-backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   This will install the dependencies inside `node_modules`

### ENV configuration

Please create and make the changes in the .env file.

```
HOST = "YOUR_DB_HOSTNAME"
USER = "YOUR_DB_USERNAME"
PASS = "YOUR_DB_PASSWORD"
DB = "YOUR_DB_NAME"

PORT = "YOUR_PORT"

SECRET_KEY = "YOUR_SECRET_KEY"

LOCAL = "YOUR_API_URL"

FROM = "YOUR_EMAIL_NAME"
EMAIL = "YOUR_EMAIL_ID"
EPASS = "YOUR_EMAIL_PASS"
```

### Usage

`node index` OR `nodemon start` OR `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8000/](http://localhost:8000/) to view it in the browser.

### Endpoint

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /auth/register | Register New User |
| POST | /auth/login | Login User |
| POST | /auth/logout | Logout User |
| GET | /auth/verify | Activate User Account |
| TBA | /auth/reset | Reset Password User |
| TBA | /auth/forgot | Forgot Password User |

### Documentation

For more info visit [Postman]()

## License

Distributed under the [MIT](https://github.com/SemediTeam/recipedia-backend/LICENSE) License.

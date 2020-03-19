## Nodejs & Typescript API template

### About the project
The main purpose is to define a complete Nodejs+Typescript API template, in order to minimize the efforts in the early steps of a project. Also, make it as maintainable and robust as possible.

### Project structure
The whole app lives in the `/src` folder, at this level you find:
1. server.ts: which starts the server at a defined port.
2. app.ts: which contains all the app's configurations.
3. routes.ts: this is the main routes file.
4. /config folder: containing the configuration for MongoDB and Passport.
5. /middleware folder: for the moment it contains the error handler middlewares. Here you can place your other middlewares.
6. /resources folder: this is the folder where you should place the logic of the app. In the first level under `/resources` you should place your entities as folders, i.e: `/resources/user`, and inside it a folder for your **controllers**, **routes** and **schema**.
7. /shared folder: this is intended to hold all functions, constants, enums, etc. that are shared throughout the application.
In the root of the project you'll find .env configuration file. This is where you should set apps: environment, salt rounds (for bcrypt algorithm), JWT secret, port and MongDB path.

### TODO:
- Add lusca
- Add permission system
- Add decorators
- Add winston
- Add SocketIO
- Add test cases
- Add support for MySQL
- Add GraphQL
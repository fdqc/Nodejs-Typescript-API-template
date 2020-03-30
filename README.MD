## Node.js & Typescript API template

### About the project
The main purpose is to define a complete Node.js+Typescript API template, in order to minimize the efforts in the early steps of a project. Also, make it as maintainable and robust as possible.

### Project structure
The whole app lives in the `/src` folder, at this level you find:
1. server.ts: which starts the server at a defined port.
2. routes.ts: this is the main routes file.
3. `/app` folder: under this folder where you'll find the app's **controllers** and **routes**.
4. `/config`: config.ts loads and exports app's environmental variables. It also contains a white list array of trusted origins (part of CORS configuration). You should place there your trusted origins when in production.
5. `/interfaces` folder: here you can place all your interfaces i.e: user.
6. `/loaders`: now the startup process is divided into several files, they are here.
7. `/middleware` folder: for the moment it contains the error handler middlewares. Here you can place your other middlewares.
8. `/models`: planned to hold each Mongoose Schema used in the app.
9. `/services`: a folder to hold the business logic.
10. `/shared` folder: this is intended to hold all functions, constants, enums, etc. that are shared throughout the application.
In the root of the project you'll find .env configuration file. This is where you should set apps: environment, salt rounds (for bcrypt algorithm), JWT secret, port and MongDB's path.

### TODO:
- ~~Add CORS middleware~~
- Add permission system
- Add decorators
- Add winston
- Add SocketIO
- Add test cases
- Add support for MySQL
- Add GraphQL
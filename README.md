# RJs App - Prototype

Express JS MVC Starter Kit, with Model Builder

## Installation

Clone this repo, and then run :

```bash
npm install
```
if using yarn :
```bash
yarn install
```
running up application :
```bash
npm run dev
```
or :
```bash
yarn start dev
```


## Usage
default port listen on port 3500

app directory seem like :
```bash
.
📂build
📂src
 ┣ 📂app
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┣ 📂helpers # you can add this folder
 ┃ ┃ ┣ 📂middleware # you can add this folder, for create middleware service before executing controller
 ┃ ┃ ┃ ┣ 📜database.ts # define database service provider 
 ┃ ┃ ┃ ┣ 📜provider.ts
 ┃ ┃ ┣ 📂core
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┣ 📜WelcomeController.ts
 ┃ ┃ ┃ ┃ ┣ ..................
 ┃ ┃ ┃ ┣ 📂model # you can add this folder for make model
 ┃ ┃ ┃ ┃ ┣ 📜ExampleModel.ts
 ┃ ┃ ┃ ┃ ┣ ..................
 ┃ ┃ ┃ ┣ 📂view
 ┃ ┃ ┃ ┃ ┣ 📂partial
 ┃ ┃ ┃ ┃ ┃ ┣ 📜head.ejs
 ┃ ┃ ┃ ┃ ┃ ┣ 📜header.ejs
 ┃ ┃ ┃ ┃ ┃ ┣ 📜footer.ejs
 ┃ ┃ ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┃ ┃ ┣ 📜welcome.ejs
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜routes.ts
📜package-lock.json
📜package.json
```
the main of workspace folder location in src/app/main, you may see controller, model, and view folder inside

## Create Controller
for create controller you should create that controller file inside - src/app/main/controller

```typescript
import { Request, Response } from "express";

export default class WelcomeController {
    public static async welcomeMessage(request: Request, response: Response) {
        response.render('pages/welcome', {
            title: "RJs App",
            message: "Welcome To RJs App"
        })
    }
}
```
and then register your controller in a routes - src/app/routes.ts

```typescript
import { Router } from "express";
import WelcomeController from "./main/controller/WelcomeController";

export default class ApplicationRoutes {
  public static InitialRoutes() {
    let router = Router();
    /**
     * register initial routes
     */

    router.use("/", WelcomeController.welcomeMessage);

    /**
     * register initial routes
     */
    return router;
  }
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

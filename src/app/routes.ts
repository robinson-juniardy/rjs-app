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

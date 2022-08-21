import { Request, Response } from "express";

export default class WelcomeController {
    public static async welcomeMessage(request: Request, response: Response) {
        response.render('pages/welcome', {
            title: "RJs App",
            message: "Welcome To RJs App"
        })
    }
}
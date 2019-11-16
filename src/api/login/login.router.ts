import { Router } from "express";
import { LoginController } from "./login.controller";

class LoginRoutes {
    private loginController: LoginController = new LoginController();
    router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.post("/login", this.loginController.login);
    }
}

const loginRoutes = new LoginRoutes();
loginRoutes.init();

export default loginRoutes.router;



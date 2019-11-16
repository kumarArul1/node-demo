import * as express from "express";
import * as bodyParser from "body-parser";
import * as useragent from "express-useragent";

import { AuthRoutes } from "./src/api/auth/jwtauth.router";
import LoginRoutes from "./src/api/login/login.router";
import ProductRoutes from "./src/api/products/products.router";


class App {
  public app: express.Application;  
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
   
  private config(): void {
    this.app.use(bodyParser.json({limit: '50mb'}));
    this.app.use('/assets', express.static('assets'));
    this.app.use(bodyParser.urlencoded({ extended: false }));  
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Expose-Headers", "x-total-count");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
      res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
      next();
    });   
  
  }

  private routes(): void {
    let router = express.Router(); 
    let authRouter= new AuthRoutes();
    this.app.use(useragent.express());   
    this.app.use('/', LoginRoutes)
    //this.app.use('/products', authRouter.isAuthenticated);
    this.app.use('/products', ProductRoutes);
    
  }
  
}

 
export default new App().app;




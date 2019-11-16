import { Router } from "express";
import { ProductsController } from "./products.controller";
import * as multer from 'multer';
import { CommonModule } from "../../common/common";
import { config } from "process";

let folderName = "products";
let datenow = Date.now;

//Country Flag image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    CommonModule.CreateDirectory('assets/images/', folderName);
    cb(null, `assets/images/${folderName}/`);
  },
  filename: function (req, file, cb) {
    cb(null, `${folderName}-image-${datenow()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

class ProductRoutes {
  private productsController: ProductsController = new ProductsController();
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get("/", this.productsController.getProductList);
    this.router.post("/add", upload.single('productImage'), this.productsController.createProducts);
    this.router.post("/edit", upload.single('productImage'), this.productsController.updateProducts);
    this.router.get("/:productId", this.productsController.getProductById);
    this.router.delete("/:productId", this.productsController.deleteProductById);
  }
}
const productRoutes = new ProductRoutes();
productRoutes.init();

export default productRoutes.router; 
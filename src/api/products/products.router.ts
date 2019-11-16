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
  private cityController: ProductsController = new ProductsController();
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get("/", this.cityController.getProductList);
    this.router.post("/add", upload.single('productImage'), this.cityController.createProducts);
    this.router.post("/edit", upload.single('productImage'), this.cityController.updateProducts);
    this.router.get("/:productId", this.cityController.getProductById);
    this.router.delete("/:productId", this.cityController.deleteProductById);
  }
}
const productRoutes = new ProductRoutes();
productRoutes.init();

export default productRoutes.router; 
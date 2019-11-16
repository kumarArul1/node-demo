import { ProductModel } from "../../../model/products/products.model";

export interface IProductRepsoitory{
  getProductList(): Promise<ProductModel[]> ;
  createProduct(productDetails):Promise<boolean>;
  updateProduct(productDetails : ProductModel): Promise<boolean>;
  deleteProduct(productId: number): Promise<boolean>;
  getProductById(productId: number): Promise<ProductModel[]>;
}
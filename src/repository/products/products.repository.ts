import { IMG_SERVER } from './../../common/common';
import { IProductRepsoitory } from '../contracts/products/i.products.repository';
import { ProductModel } from '../../model/products/products.model';
import { dbPool } from '../../common/config';
import * as fs from "fs";
import * as path from "path";

export class ProductsRepository implements IProductRepsoitory {

    constructor() { }

    async getProductList(): Promise<ProductModel[]> {
        try {
            let data: ProductModel[] = [];
            const selectQuery = `SELECT id AS "productId",
                                 product_name AS "productName",
                                 product_desc AS "productDesc",
                                 product_price AS "productPrice",
                                 CONCAT('${IMG_SERVER}',product_image) AS "productImage"
                                 FROM products`;
            const selectResult = await dbPool.query(selectQuery);
            data = selectResult.rows;
            return data;
        } catch (e) {
            throw e;
        }
    }

    async createProduct(productDetails: ProductModel): Promise<boolean> {
        try {
            const selectQuery = `SELECT product_name FROM products WHERE product_name='${productDetails.productName}'`;

            const selectResult = await dbPool.query(selectQuery);

            if (selectResult.rowCount === 0) {
                const insertQuery = `INSERT INTO public.products(
                                     product_name, product_desc, product_price, product_image, created_at)
                                     VALUES ('${productDetails.productName}', '${productDetails.productDesc}', 
                                     '${productDetails.productPrice}','${productDetails.productImage}', now());`;

                await dbPool.query(insertQuery);
            }
            return selectResult.rowCount > 0 ? false : true;

        } catch (e) {
            throw e;
        }
    }

    async updateProduct(productDetails: ProductModel): Promise<boolean> {

        try {
            const selectQuery = `SELECT product_name FROM products 
                                 WHERE product_name='${productDetails.productName}'
                                 AND id!=${productDetails.productId}`;

            const selectResult = await dbPool.query(selectQuery);

            if (selectResult.rowCount === 0) {
                const imgPath = productDetails.productImage ? `product_image='${productDetails.productImage}',` : '';
                const insertQuery = `UPDATE public.products
                                     SET 
                                     product_name='${productDetails.productName}', 
                                     product_desc='${productDetails.productDesc}', 
                                     product_price='${productDetails.productPrice}', 
                                     ${imgPath}
                                     updated_at=now()
                                     WHERE id=${productDetails.productId}`;

                await dbPool.query(insertQuery);

            }

            return selectResult.rowCount > 0 ? false : true;

        } catch (e) {
            throw e;
        }
    }

    async deleteProduct(productId: number): Promise<boolean> {
        try {

            const getProQuery = `SELECT product_image FROM public.products WHERE id=${productId}`;

            const getProResult = await dbPool.query(getProQuery);

            if (getProResult.rows.length > 0) {
                const filePath = await path.resolve(getProResult.rows[0].product_image.substr(1));
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            const deleteQuery = `DELETE FROM public.products WHERE id=${productId}`;

            const deleteResult = await dbPool.query(deleteQuery);

            return deleteResult.rowCount > 0 ? true : false;

        } catch (e) {
            throw e;
        }
    }

    async getProductById(productId: number): Promise<ProductModel[]> {
        try {

            let data: ProductModel[] = [];
            const selectQuery = `SELECT 
                                 id AS "productId",
                                 product_name AS "productName",
                                 product_desc AS "productDesc",
                                 product_price AS "productPrice",
                                 CONCAT('${IMG_SERVER}',product_image) AS "productImage"
                                 FROM products WHERE id=${productId}`;
            const selectResult = await dbPool.query(selectQuery);
            data = selectResult.rows;
            return data;

        } catch (e) {
            throw e;
        }
    }
}

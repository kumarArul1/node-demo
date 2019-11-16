import { StatusCode, no_data } from './../../common/common';
import { ProductsRepository } from '../../repository/products/products.repository';
import { Request, Response, NextFunction, Router } from "express";
import { ProductModel } from "../../model/products/products.model";
import { MSGS } from './products.constants';
import * as Joi from 'joi';
import { schema } from './products.validator';

class ProductsController {

    public async getProductList(req: Request, res: Response, next: NextFunction) {
        try {
            let productModel: ProductModel[];
            const productsRepository = new ProductsRepository;
            productModel = await productsRepository.getProductList();
            if (productModel.length > 0) {
                res.status(StatusCode.successful).json({ data: productModel });
            } else {
                res.status(StatusCode.empty).json({ message: no_data });
            }

        } catch (err) {
            res.status(StatusCode.internalServer).json({ error: err.message });
        }
    }


    public async createProducts(req: Request, res: Response, next: NextFunction) {
        try {
            // if (req['files']) {
            //     for (const iterator of req['files']) {
            //         req.body.productImage = `/${iterator.destination}${iterator.filename}`;
            //     }
            // } else {
            //     req.body.productImage = '/assets/images/noimage.jpeg';
            // }
            if (req['file']) {
                req.body.productImage = `/${req['file'].destination}${req['file'].filename}`;
            } else {
                req.body.productImage = '/assets/images/noimage.jpeg';
            }
            const cityRepository = new ProductsRepository;
            let validateData = Joi.validate(req.body, schema)
            if (validateData.error === null) {
                let addModel = await cityRepository.createProduct(req.body);
                if (addModel === true) {
                    res.status(StatusCode.successful).json({ message: MSGS.PROD_ADD });

                } else {
                    res.status(StatusCode.conflict).json({ message: MSGS.PROD_ALREADY_EXIST });
                }
            } else {
                res.status(StatusCode.badRequest).json({ message: validateData.error.details[0].message });
            }
        } catch (err) {
            res.status(StatusCode.internalServer).json({ error: err.message });

        }
    }

    public async updateProducts(req: Request, res: Response, next: NextFunction) {
        try {
            if (req['file']) {
                req.body.productImage = `/${req['file'].destination}${req['file'].filename}`;
            } else {
                req.body.productImage = '';
            }
            const cityRepository = new ProductsRepository;
            let validateData = Joi.validate(req.body, schema);
            if (validateData.error === null) {
                let editModel = await cityRepository.updateProduct(req.body);
                if (editModel) {
                    res.status(StatusCode.successful).json({ message: MSGS.PROD_UPDATE });
                } else {
                    res.status(StatusCode.conflict).json({ message: MSGS.PROD_ALREADY_EXIST });
                }
            } else {
                res.status(StatusCode.badRequest).json({ data: validateData.error.details[0].message });
            }
        } catch (err) {
            res.status(StatusCode.internalServer).json({ error: err.message });
        }
    }


    public async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            let productModel: ProductModel[];
            const productsRepository = new ProductsRepository;
            productModel = await productsRepository.getProductById(req.params.productId);
            if (productModel.length > 0) {
                res.status(StatusCode.successful).json({ data: productModel });
            } else {
                res.status(StatusCode.empty).json({ message: no_data });
            }

        } catch (err) {
            res.status(StatusCode.internalServer).json({ error: err.message });
        }
    }



    public async deleteProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const productsRepository = new ProductsRepository;
            let cityModel = await productsRepository.deleteProduct(req.params.productId)
            if (cityModel) {
                res.status(StatusCode.successful).json({ message: MSGS.PROD_DELETE });

            } else {
                res.status(StatusCode.empty).json();
            }

        } catch (err) {
            res.status(StatusCode.internalServer).json({ error: err.message });

        }
    }

}
export { ProductsController }; 
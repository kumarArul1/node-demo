class ProductModel{
    productName : string;
    productId : number;
    productDesc : string;
    productPrice : number;
    productImage: string;
    constructor( productName : string, productId : number, productDesc : string,productPrice: number,productImage: string){
        this.productName = productName;
        this.productId = productId;
        this.productDesc = productDesc;
        this.productPrice = productPrice;
        this.productImage =productImage;
    }
}

export {ProductModel};
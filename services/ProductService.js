
import Product from "../models/ProductModel.js"

const ProductService = {
  async getItems() {
      const products = await Product.find();
      return {
        status: true,
        products
      };
  },
  async getItem(id) {
      const product = await Product.findOne({_id : id});
      if(!product) throw Error("item not found")
      const relatedProducts = await Product.find({category : product?.category});
      return {
        status: true,
        product,
        relatedProducts
      };
  },
};

export default ProductService;
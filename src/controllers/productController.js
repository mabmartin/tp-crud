import Product from "../models/productModel.js";

export const getProducts = async (req, res) => { 
    try {
        const products = await Product.find()
        console.log(products)
        console.log(products.length)    
        if (products.length ===0){
           return res.status(204).json({ message: "No products found" })
    }
    return res.status(200).json(products)
    }  catch (error) {
          return res.status(500).json({ message: "internal server error",error })
    }
};

export const validate = async (req, res) => {
    try {
        const { name, status, price } = req.body;
        const product = new Product({ name, status, price });
        await product.save();
        return res.status(201).json({ message: "Product created successfully" });
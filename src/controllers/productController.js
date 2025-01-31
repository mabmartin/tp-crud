import Product from "../models/productModel.js";

export const getProducts = async (req, res) => { 
    try {
        const products = await Product.find().populate("category")
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
        
        const productData = req.body
        console.log(productData)
        const { name } = productData
        const productExist = await Product.findOne({ name })
        if(productExist){
            console.log(productExist)
            return res.status(400).json({ message: `Product ${name} already exists` })
        }
        const newProduct = new Product(productData)
        console.log({newProduct})
        const savedProduct = await newProduct.save()
        console.log({savedProduct})
        return res.status(200).json(savedProduct)
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error})
    }
}
 export const createProduct = async (req, res) => {
    try {
        const productData = req.body
        const { name } = productData
        const productExist = await Product.findOne({ name })
        if(productExist){
            return res.status(400).json({ message: `Product ${name} already exists` })
        }
      const newProduct = new Product(productData)
      console.log({newProduct})
      const savedProduct = await newProduct.save()
      return res.status(200).json(savedProduct)
    
        }catch (error) {
            return res.status(500).json({message: "Internal server error", error})
        }
    }
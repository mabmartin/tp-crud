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
        const { nombre } = productData  // Cambiado de name a nombre
        
        // Verificar si el producto existe
        const productExist = await Product.findOne({ nombre })  // Cambiado de name a nombre
        if(productExist){
            return res.status(400).json({ 
                message: `El producto ${nombre} ya existe en la base de datos` 
            })
        }

        // Crear y guardar el nuevo producto
        const newProduct = new Product(productData)
        const savedProduct = await newProduct.save()
        
        return res.status(201).json({  // Cambiado de 200 a 201 para creación
            message: "Producto creado exitosamente",
            product: savedProduct
        })

    } catch (error) {
        // Manejar errores de validación
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: "Error de validación",
                errors: Object.values(error.errors).map(err => err.message)
            })
        }
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}
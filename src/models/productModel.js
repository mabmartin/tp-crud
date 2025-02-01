import { model, Schema } from "mongoose"

const statusEnum = ["AVAILABLE", "UNAVAILABLE", "OUT OF STOCK"] 

const productSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Por favor ingrese el nombre del producto"],
        // unique: true,
        trim: true,
        lowercase: true,
        index: true,
        
    },
    tipo: {
        type: String,
        required: [true, "Por favor ingrese el tipo de pasta"],
        trim: true
    },
    relleno: {
        type: String,
        required: [true, "Por favor ingrese el relleno"],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, "Por favor ingrese el precio"],
        min: 0
    },
    stock: {
        type: Number,
        required: [true, "Por favor ingrese el stock disponible"],
        min: 0
    }
})
productSchema.indexes().forEach(index => {
    productSchema.index(index[0], { background: true });
});


export default model("Product", productSchema)

# TP-CRUD 🌐

Este proyecto es una **API REST** desarrollada para gestionar una base de datos de pastas artesanales. La API permite realizar operaciones CRUD sobre los siguientes modelos: **User**, **Product** y **Category**.

## 🛠️ Tecnologías utilizadas
* **Node.js**
* **Express.js**
* **MongoDB** con **Mongoose**
* **jsonwebtoken** para autenticación
* **bcrypt** para encriptación de contraseñas
* **dotenv** para variables de entorno
* **cors** para manejo de CORS
* **cookie-parser** para manejo de cookies

## 🚀 Cómo correr el proyecto

1. Clonar el repositorio
```bash
git clone https://github.com/mabmartin/tp-crud
```

2. Instalar dependencias
```bash
npm i
```

3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT = 3000
MONGODB_URI = mongodb://127.0.0.1:27017/backend
SECRET = secret
```

4. Iniciar el servidor
```bash
npm run dev
```

## 📌 Endpoints disponibles

### Users
* `GET /api/user/get` - Obtener todos los usuarios
* `POST /api/user/create` - Crear un nuevo usuario
* `POST /api/user/login` - Iniciar sesión

### Products
* `GET /api/product/get` - Obtener todos los productos (requiere token)
* `POST /api/product/create` - Crear un nuevo producto

### Categories
* `GET /api/category/get` - Obtener todas las categorías
* `POST /api/category/create` - Crear una nueva categoría

## 🔧 Ejemplos de datos mock

### Usuario
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "password": "123456",
  "roles": ["CUSTOMER"]
}
```

### Producto
```json
{
    "nombre": "raviolones",
    "tipo": "pasta rellena",
    "relleno": "ricotta y espinaca",
    "precio": 1500,
    "stock": 100
}
```

### Categoría
```json
{
    "name": "pastas frescas",
    "description": "Pastas elaboradas artesanalmente"
}
```

## 🔐 Autenticación

La API utiliza autenticación basada en JWT (JSON Web Tokens). Para acceder a los endpoints protegidos:

1. Primero, obtén un token mediante el endpoint de login
2. Incluye el token en el header de tus peticiones:
```
Authorization: Bearer tu-token-aqui
```

## 📝 Modelos de datos

### Usuario
- name (String, required, único)
- password (String, required)
- email (String, required, único)
- roles (Array de Strings: ["ADMIN", "MERCHANT", "CUSTOMER"])
- Image (String, default: URL de imagen aleatoria)

### Producto
- nombre (String, required)
- tipo (String, required)
- relleno (String, required)
- precio (Number, required, min: 0)
- stock (Number, required, min: 0)

### Categoría
- name (String, required, único)
- description (String)

## 🧪 Validaciones

- Todos los campos required deben ser proporcionados
- Los emails deben ser únicos en la base de datos
- Los nombres de categorías deben ser únicos
- Los precios y stock no pueden ser negativos
- Las contraseñas son encriptadas automáticamente antes de guardarse

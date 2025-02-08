import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
    // Your code to get products
    try {
        console.log("Attempting to fetch products from database...");
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;
        console.log("Fetched products:", products);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in getProducts function:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
export const getProduct = async (req, res ) => {
           try {
               console.log("Attempting to fetch product from database...");
               const product = await sql`
                   SELECT * FROM products
                   WHERE id = ${req.params.id}
               `;
               console.log("Fetched product:", product);
               res.status(200).json({ success: true, data: product });
           } catch (error) {
               console.error("Error in getProduct function:", error);   
               res.status(500).json({ success: false, message: "Internal Server Error" });
           }
};

export const createProduct = async (req, res) => {
const { name, image, price } = req.body;
    try {
        if (!name  || !image || !price){
            return res.status(400).json({
                success: false, message : "Please provide all the required fields"
            })
        }
        const newProduct = await sql`
            INSERT INTO products (name, image, price)
            VALUES (${name}, ${image}, ${price})
            RETURNING *
        `;
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in createProduct function:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const updateProduct = async (req,res ) => {
    try {
        const { name, image, price } = req.body;
        const updatedProduct = await sql`
            UPDATE products
            SET name = ${name}, image = ${image}, price = ${price}
            WHERE id = ${req.params.id}
            RETURNING *
        `;
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in updateProduct function:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await sql`
            DELETE FROM products
            WHERE id = ${req.params.id}
        `;
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProduct function:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
import express from "express" ;
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js"
import { sql } from "./config.js/db.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000 

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/",(req,res)=>{
    res.send("hello")
})

app.get("/api/products", productRoutes )

async function initDB(){
    try{
        await sql`
            CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log("db inital sucess")
    }catch(error) {
        console.log("Error initDB",error)
    }
}

initDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server running on port " + PORT)
    });
})

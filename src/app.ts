
import express, { Request, Response } from "express"
import helmet from "helmet"
import cors from 'cors'
import { errorMiddleware, TryCatch } from "@/middlewares/error.js"
import morgan from "morgan"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import router from "./routes"
import { connectDB } from "./database/db.config"
  
  dotenv.config({path: './.env',});
  
  export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
  const port = process.env.PORT || 3000;
  
export const db = new PrismaClient();
  const app = express();
  
                                
  
  
app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);
    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin:' * ',credentials:true}));
app.use(morgan('dev'))
connectDB()  
  
  app.get('/', (req, res) => {
     res.send('Hello, World!');
  });
  // your routes here
  app.use('/api',router)

  app.get("*", (req, res) => {
    res.status(404).json({
      success: false,
      message: "Page not found",
    });
  });
  
  app.use(errorMiddleware);
    
  app.listen(port, () => console.log('Server is working on Port:'+port+' in '+envMode+' Mode.'));
  
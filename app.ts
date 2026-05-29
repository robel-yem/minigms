import express from "express";
import dotenv from "dotenv";
import { mainRouter } from "./routes";

dotenv.config();
const PORT = process.env.PORT ?? 5000;

const app = express();
app.use(express.json());
app.use("/", mainRouter);
app.listen(PORT, ()=>{
    console.log(`Server listening on Port: ${PORT}`);
});
import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config'
import cors from "cors" ;
import mongoose from "mongoose";
// import Meme from "./Models/memeModel.js";
import routes from "./Routes/memeRoutes.js";


const app = express();
const port = process.env.PORT  || 3000 ;


app.use('/',routes)


// app.use(cors())

 app.listen(port,'0.0.0.0',()=>{
  console.log(`Server is running on port ${port}`)
})
  





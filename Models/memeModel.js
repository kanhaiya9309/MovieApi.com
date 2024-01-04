import mongoose from "mongoose";


const memeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
  })
  
  
const Meme = mongoose.model('Meme', memeSchema);

export default Meme ;
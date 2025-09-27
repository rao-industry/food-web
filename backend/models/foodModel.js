import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number},
    image: { type: String, required:true},
    category: { type: String, required: true }
});

export default mongoose.model("Food", foodSchema);
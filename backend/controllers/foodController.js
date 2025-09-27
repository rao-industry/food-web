import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';



const addFood = async (req, res) => {

    try {
        // Create uploads directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided"
            });
        }

        const { name, description, price, category } = req.body;

        const food = new foodModel({
            name,
            description: description || "",
            price,
            category,
            image: req.file.filename
        });

        await food.save();

        res.status(201).json({
            success: true,
            message: "Food added successfully",
            data: food
        });

    } catch (error) {
        console.error("Error adding food:", error);
        
        // Delete uploaded file if error occurs
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({
            success: false,
            message: "Failed to add food item",
            error: error.message
        });
    }
};


// all food list

const listFood = async (req,res) =>{

try {
    const foods = await foodModel.find({})

res.json({success:true,data:foods})

} catch (error) {
    console.log (error);
    res.json ({success:false,message:"Error"})
}


}


//Remove fooditem



const RemoveFood = async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);

        fs.unlink(`uploads/${food.image}`,()=>{})
await foodModel.findByIdAndDelete(req.body.id);

res.json({success:true,message:"Food removed"})


    } catch (error) {
        console.log (error);
        res.json({success:false,message:"Error"})
    }

}
export { addFood ,listFood,RemoveFood};
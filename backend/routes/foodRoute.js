import express from "express";
import { addFood ,listFood,RemoveFood} from "../controllers/foodController.js";
import multer from "multer";
import path from 'path';

const router = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(process.cwd(), 'uploads');
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post("/add", upload.single("image"), addFood);

router.get("/list", listFood);
router.post("/remove",RemoveFood);

export default router;
import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyOrder,userorders, listOrders, updatestatus  } from "../controllers/orderController.js"


// ✅ Correct for CommonJS in ESM
import jwt from "jsonwebtoken";
const { verify } = jwt;


const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);

orderRouter.post("/verify",verifyOrder)
orderRouter.post ("/userorders",authMiddleware,userorders);
orderRouter.get('/list',listOrders)
orderRouter.post ("/status",updatestatus)


export default orderRouter;

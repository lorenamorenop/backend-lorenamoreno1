import { Router } from "express";
import productRouter from "./productRouter.js";
import cartRouter from "./cartRouter.js";

const router = Router();

router.use("/products", productRouter);
router.use("/carts", cartRouter);

export default router;

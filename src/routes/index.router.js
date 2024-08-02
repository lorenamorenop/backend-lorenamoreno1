import productsRouter from "./productRouter.js";
import cartsRouter from "./cartRouter.js";
import { Router } from "express";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);

export default router;

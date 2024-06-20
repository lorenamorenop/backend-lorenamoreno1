import { Router } from "express";
import productManage from "../managers/productManage.js";
import { checkProductData } from "../middlewares/checkProductDataMiddleware.js";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManage.getProducts(limit);
    res.send(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManage.getProductById(pid);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "ok", product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

router.put("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const product = await productManage.updateProduct(pid, body);
    res.send(product);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

router.post("/products", checkProductData, async (req, res) => {
  try {
    const body = req.body;
    const product = await productManage.addProduct(body);

    res.status(201).json({ status: "ok", product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

router.delete("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManage.getProductById(pid);

    if (!product)
      return res
        .status(404)
        .json({ status: "error", msg: "Producto no encontrado" });

    await productManage.deleteProduct(pid);

    res.status(200).json({
      status: "ok",
      msg: `Producto con el ID ${pid} eliminado con éxito`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

export default router;

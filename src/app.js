import express from "express";
import productRouter from "./router/productRouter.js";
import cartRouter from "./router/cartRouter.js";

const app = express();
const PORT = 8080;

app.use(express.json()); // Este middleware nos permite obtener/leer archivos json

app.use(express.urlencoded({ extended: true })); //middloare fijos antes de rutas
app.use("/static", express.static("public")); //contenido estatico de acceso al cliente

app.use("/api", productRouter);
app.use("/api", cartRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${PORT}`);
});

import express from "express";
import { connectMongoDB } from "./config/mongoDb.config.js";
import envs from "./config/envs.config.js";
import router from "./routes/index.router.js";

const app = express();

connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", router);
app.listen(envs.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envs.PORT}`);
});

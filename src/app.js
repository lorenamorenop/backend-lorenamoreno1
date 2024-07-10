import express from "express";
import routes from "./routes/index.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";
import __dirname from "./dirname.js";

const app = express();
const PORT = 8080;

app.use(express.json()); // Este middleware nos permite obtener/leer archivos json

app.use(express.urlencoded({ extended: true })); //middloare fijos antes de rutas
app.engine("handlebars", handlebars.engine()); // Inicia el motor del la plantilla
app.set("views", __dirname + "/views"); // Indicamos que ruta se encuentras las vistas
app.set("view engine", "handlebars"); // Indicamos con que motor vamos a utilizar las vistas
app.use(express.static("public")); //contenido estatico de acceso al cliente

app.use("/api", routes);
app.use("/", viewsRoutes);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${PORT}`);
});

//se crea aca el servidor de socket, asi sabe en que puerto se conecta
export const io = new Server(httpServer);
//parametro on para escuchar y emit para enviar:

//primero escuchamos la conexion, el handsacke, donde el cliente autoriza que le mandemos la informacion
io.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
});

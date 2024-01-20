import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./config/routes/inventarioRoutes.js";
import { logger } from "logger-express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger());
app.use("/joyas", router);

app.listen(PORT, console.log(`¡Servidor encendido en el puerto! ${PORT}`));

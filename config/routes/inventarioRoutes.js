import express from "express";
//Acá se importan las funciones del Controlador
const router = express.Router();

router.get("/joyas", getAllJoyas);
router.get("/joyas/filtros", getFilterJoyas);

export default router;

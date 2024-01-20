import { Router } from "express";
import {
  getAllJoyas,
  getFilterJoyas,
} from "../../src/api/v1/controllers/inventarioController.js";
const router = Router();

router.get("/", getAllJoyas);
router.get("/filtros", getFilterJoyas);

export default router;

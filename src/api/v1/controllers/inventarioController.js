import {
  getInventario,
  getFiltroInventario,
} from "../models/inventarioModel.js";
import prepareHateoas from "../helpers/hateoas.js";
import { findError } from "../utils/error.js";

const getAllJoyas = async (req, res) => {
  try {
    const { limits, order_by, page } = req.query;
    const inventarioBruto = await getInventario(limits, order_by, page);
    const inventarioProcesado = await prepareHateoas("joyas", inventarioBruto);

    res.status(200).json(inventarioProcesado);
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

const getFilterJoyas = async (req, res) => {
  try {
    const { price_min, price_max, category, metal } = req.query;
    const inventario = await getFiltroInventario(
      price_min,
      price_max,
      category,
      metal
    );
    res.status(200).json(inventario);
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

export { getAllJoyas, getFilterJoyas };

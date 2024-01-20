import pool from "../../../../config/db/connectionDb.js";
import format from "pg-format";

const getInventario = async (limits = 3, order_by = "id_ASC", page = 1) => {
  const SQLquery = "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s";
  const [attribute, direction] = order_by.split("_");
  const offset = (page - 1) * limits;
  const formattedQuery = format(SQLquery, attribute, direction, limits, offset);
  console.log("query: ", formattedQuery);
  const { rows } = await pool.query(formattedQuery);
  console.log("response", rows);
  return rows;
};

const getFiltroInventario = async (
  precio_min = 0,
  precio_max = 50000,
  categoria = false,
  metal = false
) => {
  let SQLquery = "SELECT * FROM inventario";
  let filters = [];
  const values = [];

  const addFilter = (field, comparator, value) => {
    values.push(value);
    const { length } = filters;
    filters.push(`${field} ${comparator} $${length + 1}`);
  };
  if (precio_min) addFilter("precio", ">=", precio_min);
  if (precio_max) addFilter("precio", "<=", precio_max);
  if (categoria) addFilter("categoria", "=", categoria);
  if (metal) addFilter("metal", "=", metal);

  if (filters.length > 0) {
    filters = filters.join(" AND ");
    SQLquery += ` WHERE ${filters}`;
  }
  const { rows } = await pool.query(SQLquery, values);
  return rows;
};

export { getInventario, getFiltroInventario };

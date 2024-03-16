const { pool } = require('../database/connection.js');

const format = require('pg-format');



const traeJoyas = async ({limits=2, page=1, order_by="id_ASC"}) => {
    const [campo, direccion] = order_by.split("_");
    const offset = Math.abs(((page <= 0 ? 1 : page) - 1) * limits);

    const formattedQuery = format('SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
    const { rows } = await pool.query(formattedQuery)
    //console.log(rows);
    return rows;
  };

  const traeJoyaID = async (id) => {
    const formattedQuery = format('SELECT * FROM inventario WHERE id = %s', id);

    console.log(formattedQuery);

    const { rows } = await pool.query(formattedQuery)
    
    return rows;
  };

  
  const traeJoyasFiltradas = async ({precio_max, precio_min, categoria, metal}) => {
    let filtros = []
    const values = []

    const agregarFiltro = (campo, comparador, valor) => {
      values.push(valor)
      const { length } = filtros
      filtros.push(`${campo} ${comparador} $${length + 1}`)
    }

    if (precio_min) agregarFiltro('precio', '>=', precio_min)
    if (precio_max) agregarFiltro('precio', '<=', precio_max)
    if (categoria) agregarFiltro('categoria', '=', categoria)
    if (metal) agregarFiltro('metal', '=', metal)

    let consulta = "SELECT * FROM inventario"

    if (filtros.length > 0) {
      filtros = filtros.join(" AND ")
      console.log(filtros)
      consulta += ` WHERE ${filtros}`
    }

    console.log(consulta)

    const { rows } = await pool.query(consulta, values)
    return rows

  };
  // precio_max=25000&precio_min=10000&categoria=aros&metal=oro
module.exports= { traeJoyas, traeJoyasFiltradas, traeJoyaID };


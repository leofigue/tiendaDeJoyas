const { traeJoyas, traeJoyasFiltradas, traeJoyaID } = require('../models/model.js');


class joyasController{

    constructor(){}

    async traerJoyas (req, res) {
        try {
            const joyas = await traeJoyas(req.query);
            const HATEOAS = await prepararHATEOAS(joyas, req.query.page)
            
            res.json(HATEOAS);    
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    } 

    async traeJoyaID (req, res) {
        try {
            console.log(req.params.id)
            const joyasID = await traeJoyaID(req.params.id);
            
            res.json(joyasID);    
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    async filtrarJoyas (req, res) {
        try {
            const joyas = await traeJoyasFiltradas(req.query);
            res.json(joyas);    
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    } 

}





const prepararHATEOAS = (datos, page) => {
    const results = datos.map((joya) => {
        return {
        name: joya.nombre,
        categoria: joya.categoria,
        href: `/joyas/joya/${joya.id}`,
        }
        })
    const prev = page <= 1 ? null : page-1
    const next = page <= 1 ? null : parseInt(!page ? 1 : page) + 1
    const totalStock =  datos.reduce((total, joya) => total + joya.stock, 0);
    const total = datos.length
    const HATEOAS = {
    total,
    totalStock,
    prev,
    next,
    results
    }
    return HATEOAS
    }

module.exports = new joyasController();
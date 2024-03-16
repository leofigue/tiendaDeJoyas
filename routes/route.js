const express = require("express");
const controladorJoyas = require("../controllers/joyasController.js");
const router = express.Router();
const activityLogger = require("../utils/activityLogger.js");

router.use(activityLogger);

 router.get("/", controladorJoyas.traerJoyas);

 router.get("/joya/:id", controladorJoyas.traeJoyaID);

 router.get("/filtros", controladorJoyas.filtrarJoyas);

// router.get("/joya/:id", consultas.byId);



module.exports =  router ;
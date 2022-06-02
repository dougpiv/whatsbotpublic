const { Router } = require("express");
const botController = require("../controllers/botController");

const router = Router();

router
    .post("/sendtext", botController.sendText2)
    .post("/sendimg", botController.sendImg)
    .post("/login", botController.loginSession)
    .post("/verifica", botController.verifySession)
    .post("/verificanumeronaoexiste", botController.verifyNumeroNaoExiste);

module.exports = router;

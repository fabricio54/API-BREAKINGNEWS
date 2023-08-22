/*
import { Router } from "express";
const router = Router();

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json"};

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

export default router;
*/

const router = require("express").Router();

const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("../swagger.json");

router.use("/", swaggerUi.serve);
router.use("/", swaggerUi.setup(swaggerDocument));

module.exports = router;

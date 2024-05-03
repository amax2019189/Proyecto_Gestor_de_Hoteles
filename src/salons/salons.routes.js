import { Router } from "express";
import { check } from "express-validator";
import { createSalon } from "./salons.controller.js";
import { validarCampos } from "../helpers/validarCampos.js";
const routerSalon = Router();

routerSalon.post(
    "/createSalon",
    [
        check("name", "name is required").not().isEmpty(),
        check("amount", "amount is required").not().isEmpty(),
        check("eventType", "eventType is required").not().isEmpty(),
        validarCampos,
    ],
    createSalon
);

export default routerSalon;
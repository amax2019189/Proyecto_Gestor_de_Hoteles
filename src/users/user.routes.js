import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../helpers/validarCampos.js";
import { userRegist } from "./user.controller.js";
import { validarName } from "../Middleware/user-validators.js";
import { verificarUser } from "../Middleware/validarEmail.js";
const routerUser = Router();

routerUser.post(
  "/userRegist",
  [
    check("email", "email is required").isEmail(),
    check("nameUser", "nameUser is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
   validarName,
   verificarUser,
    validarCampos,
  ],
  userRegist
);

export default routerUser;

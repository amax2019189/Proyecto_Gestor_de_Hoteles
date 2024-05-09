import { Router } from "express";
import { check } from "express-validator";
import { getRoomsAndSalons, updateUser, deleteUser } from "./user.controller.js";
import { rolValidate } from "../middleware/users-validations.js";
import { validarJWT } from "../middleware/validar-jws.js";
const routerUser = Router();

routerUser.get("/roomsAndSalons", getRoomsAndSalons);

routerUser.put('/update', 
    [
        check("email", "Este no es un correo válido").isEmail(),
        check("username", "El username es obligatorio").not().isEmpty(),
        check("password", "El password es obligatorio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({
          min: 6,
        }),
        validarJWT, 
        rolValidate
    ], 
    updateUser);
    
routerUser.delete('/delete', validarJWT, deleteUser)

export default routerUser;
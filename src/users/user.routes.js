import { Router } from "express";
import {validarJWT} from '../middleware/validar-jws.js';
import { check } from "express-validator";
import { updateAccount, deleteAccount } from "./user.controller.js";

const router = Router();

router.put('/account', 
    validarJWT,
    [
        check('email', 'The email is required').isEmail(),
        check('username', 'The username is required').notEmpty(),
        check('newPassword', 'New password is required').optional().isLength({ min: 6 }).withMessage('The password must be at least 6 characters long')
    ],
    updateAccount
);

router.delete('/account', 
    validarJWT,
    deleteAccount
);

export default router;
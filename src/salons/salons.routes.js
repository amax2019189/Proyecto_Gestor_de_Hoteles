import { Router } from "express";
import { check } from "express-validator";
import {
    salonsPost
} from "./salons.controller.js";

const router = Router();

router.post(
    "/createSalon",
    [
        check("name", "The name is necessary"),
        check("amount", "The quantity is necessary"),
        check("eventType", "Event type is required to book"),
    ],
    salonsPost
);

export default router;
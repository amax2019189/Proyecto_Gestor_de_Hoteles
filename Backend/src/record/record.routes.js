import express from 'express';
import ReservationController from './reservation.controller.js';

const router = express.Router();

router.get('/historial', ReservationController.getReservations);

export default router;
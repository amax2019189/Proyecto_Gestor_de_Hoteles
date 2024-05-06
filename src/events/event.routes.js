import { Router } from "express";
import { check } from "express-validator";
import { 
    eventPost, 
    getEvents, 
    updateEvent, 
    deleteEvent } from "./event.controller.js";

const event = Router();

event.post('/createEvent', eventPost);

event.get('/', getEvents);

event.put('/updateEvent/:id', updateEvent);

event.delete('/deleteEvent/:id', deleteEvent)

export default event;
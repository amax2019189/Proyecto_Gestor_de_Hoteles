import Salons from "./salons.model.js";
import { response, request } from "express";

export const createSalon = async (req = request, res = response) => {
  const { name, amount, eventType } = req.body;
  try {
    const salonCreate = new Salons({ name, amount, eventType });
    await salonCreate.save();

    res.status(201).json({ msg: "salon agregado correctamente", salonCreate });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

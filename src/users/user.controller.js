import { request, response } from "express";
import User from "../users/user.model.js";
import bcryptjs from "bcryptjs";

export const userRegist = async (req = request, res = response) => {
  const { nameUser, email, password } = req.body;
  try {
    const user = new User({ nameUser, email, password });
    const encripClave = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, encripClave);
    await user.save();

    res.status(201).json({ msg: "User added correctly", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
      error,
    });
  }
};

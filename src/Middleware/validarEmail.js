// importación de modelo usuario
import userModel from "../users/user.model.js";

export const verificarUser = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Correo electrónico inválido." });
  }

  next();
};

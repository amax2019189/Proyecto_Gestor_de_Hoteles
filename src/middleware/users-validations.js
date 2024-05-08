export const rolValidate = (req, res, next) => {
  const { roleUser } = req.body;

  const rolesExistentes = ["admin", "user", "hotel"];

  if (!rolesExistentes.includes(roleUser)) {
    const mensajeErrorsito = `El rol que puedes elegir es uno de los siguientes: ${rolesExistentes.join(
      ", "
    )}`;
    return res.status(400).json({
      msg: mensajeErrorsito,
    });
  }

  next();
};

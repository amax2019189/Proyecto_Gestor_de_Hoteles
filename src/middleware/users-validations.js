export const rolValidate = (req, res, next) => {
  const { roleUser } = req.body;
  const rolevalidate = roleUser.toLowerCase();

  const rolesExistentes = ["admin", "user", "hotel"];

  if (rolevalidate != rolesExistentes) {
    const mensajeErrorsito = `el rol que puedes elegir es uno de los siguientes: ${rolesExistentes.join(
      ","
    )}`;
    return res.status(400).json({
      msg: mensajeErrorsito,
    });
  }

  next();

};

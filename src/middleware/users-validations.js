export const rolValidate = (req, res, next) => {
    if (req.body && req.body.roleUser) {
      const roleUser = req.body.roleUser.toLowerCase();
      const rolesExistentes = ["admin", "user", "hotel"];
  
      if (!rolesExistentes.includes(roleUser)) {
        const mensajeErrorsito = `El rol que puedes elegir es uno de los siguientes: ${rolesExistentes.join(",")}`;
        return res.status(400).json({
          msg: mensajeErrorsito,
        });
      }
    }
  
    next();
  };
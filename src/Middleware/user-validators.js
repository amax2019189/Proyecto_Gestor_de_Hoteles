
import Users from '../users/user.model.js';


export const validarName = (req, res, next) => {
    const { nameUser } = req.body;

    const userRep = Users.findOne({ nameUser });

    if (userRep === nameUser) {
        return res.status(401).json({
            msg: 'username already exists',
        });
    }

    next();
};
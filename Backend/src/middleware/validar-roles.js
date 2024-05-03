import { request, response } from "express";

export const adminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'It is required to verify the ROLE without validating the TOKEN first'
        });
    }

    const { rol, username } = req.user;

    if (rol !== 'ADMIN_ROL') {
        return res.status(500).json({
            msg: `${username} is not ADMIN - Does not have ACCES to this function`
        });
    }

    next();
}

export const clientRole = (req, res, next) => {
    if(!req.user) {
        return res.status(500).json({
            msg: 'It is required to verify the ROLE without validating the TOKEN first'
        });
    }

    const { rol, username } = req.user;

    if (rol !== 'CLIENT_ROL') {
        return res.status(500).json({
            msg: `${username} is not CLIENT - Does not have ACCESS to this function`
        });
    }

    next();
}

export const needRole = (...roles) => {
    return (req, res, next) => {
        if(!req.user) {
            return res.status(500).json({
                msg: 'It is required to verify the ROLE without validating the TOKEN first'
            });
        }

        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                msg: `The service requires one of the following roles: ${roles}`
            })
        }

        next();
    }
}


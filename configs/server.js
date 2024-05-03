'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import salonRoutes from '../src/salons/salons.routes.js'
import userRoutes from '../src/users/user.routes.js'

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.salonsPath = '/apiHotel/v1/salons';
        this.usersPath = '/apiHotel/v1/users';
        this.middleware();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middleware(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.salonsPath, salonRoutes);
        this.app.use(this.usersPath, userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server;
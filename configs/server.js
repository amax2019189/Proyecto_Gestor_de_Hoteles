'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import roomsRouter from '../src/rooms/room.routes.js'
import salonsRoutes from '../src/salons/salons.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import eventRoutes from '../src/events/event.routes.js'
import hotelsRoutes from '../src/hotels/hotels.routes.js'
import userRoutes from '../src/users/user.routes.js'


class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.roomsPath = '/hotelManagerApi/v1/rooms'
        this.salonsPath = '/hotelManagerApi/v1/salons'
        this.authPath = '/hotelManagerApi/v1/auth'
        this.eventPath = '/hotelManagerApi/v1/event'
        this.hotelPath = '/hotelManagerApi/v1/hotel'
        this.userPath = '/hotelManagerApi/v1/user'
        
        this.middleware()
        this.conectarDB()
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middleware(){
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use(this.roomsPath, roomsRouter)
        this.app.use(this.salonsPath, salonsRoutes)
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.eventPath, eventRoutes)
        this.app.use(this.hotelPath, hotelsRoutes)
        this.app.use(this.userPath, userRoutes)
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server
import express from 'express'
import mongoose from 'mongoose'
import nuxtjs from 'nuxt'

import authRouter   from './Routes/AuthRoute.js'
import clubRouter   from './Routes/ClubRoute.js'
import playerRouter from './Routes/PlayerRoute.js'
import gameRouter   from './Routes/GameRoute.js'
import ratingRouter from './Routes/RatingRoute.js'

const PORT = 
const DB_URL =

const app = express()

app.use(express.json())

app.use('/api', authRouter)
app.use('/api', clubRouter)
app.use('/api', playerRouter)
app.use('/api', gameRouter)
app.use('/api', ratingRouter)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})

        const { loadNuxt, build } = nuxtjs

        const isDev = process.env.NODE_ENV !== "production"

        const nuxt = await loadNuxt(isDev ? "dev" : "start")

        app.use(nuxt.render)

        if (isDev) {
          build(nuxt)
        }

        let date = new Date ()

        app.listen(PORT, () => {
            console.log(`Сервер запущен, порт: ${PORT}, время запуска: ${date}`)
        })

    } catch (e) {
        console.log(e)
    }
}

startApp()

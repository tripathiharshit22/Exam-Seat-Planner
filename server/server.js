import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import testRoutes from './routes/testRoutes.js'
import classroomRoutes from './routes/classroomRoutes.js'
import allocateRoutes from './routes/allocateRoutes.js'

dotenv.config()

connectDB()

const app = express()

const allowedOrigins = process.env.CLIENT_URL
    ? [process.env.CLIENT_URL]
    : ['http://localhost:5173']

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || process.env.NODE_ENV !== 'production') return callback(null, true)
        if (allowedOrigins.includes(origin)) return callback(null, true)
        callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json())

app.use('/api/test', testRoutes)
app.use('/api/classrooms', classroomRoutes)
app.use('/api/allocate', allocateRoutes)

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

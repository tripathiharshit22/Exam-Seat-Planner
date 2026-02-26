import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import testRoutes from './routes/testRoutes.js'
import classroomRoutes from './routes/classroomRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/test', testRoutes)
app.use('/api/classrooms', classroomRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

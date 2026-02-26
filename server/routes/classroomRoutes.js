import express from 'express'
import { createClassroom, getClassrooms } from '../controllers/classroomController.js'

const router = express.Router()

router.post('/', createClassroom)
router.get('/', getClassrooms)

export default router

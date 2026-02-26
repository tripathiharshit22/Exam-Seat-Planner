import express from 'express'
import { createClassroom, getClassrooms, deleteClassroom } from '../controllers/classroomController.js'

const router = express.Router()

router.post('/', createClassroom)
router.get('/', getClassrooms)
router.delete('/:id', deleteClassroom)

export default router

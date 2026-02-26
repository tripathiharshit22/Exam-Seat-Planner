import express from 'express'
import { allocateExam } from '../controllers/allocateController.js'

const router = express.Router()

router.post('/', allocateExam)

export default router

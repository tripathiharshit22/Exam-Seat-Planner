import Classroom from '../models/Classroom.js'

const isMissingOrEmpty = (val) =>
    val === undefined || val === null || String(val).trim() === ''

const isValidPositiveInt = (val) =>
    !isNaN(val) && Number.isInteger(Number(val)) && Number(val) >= 1

const isValidNonNegativeInt = (val) =>
    !isNaN(val) && Number.isInteger(Number(val)) && Number(val) >= 0

export const createClassroom = async (req, res) => {
    try {
        const { roomId, capacity, floorNo, nearWashroom } = req.body

        if (isMissingOrEmpty(roomId))
            return res.status(400).json({ error: 'Room ID is required' })

        if (isMissingOrEmpty(capacity))
            return res.status(400).json({ error: 'Capacity is required' })

        if (isMissingOrEmpty(floorNo))
            return res.status(400).json({ error: 'Floor number is required' })

        if (!isValidPositiveInt(capacity))
            return res.status(400).json({ error: 'Capacity must be a positive integer' })

        if (!isValidNonNegativeInt(floorNo))
            return res.status(400).json({ error: 'Floor number must be a non-negative integer' })

        const existing = await Classroom.findOne({ roomId: roomId.trim() })
        if (existing)
            return res.status(409).json({ error: `Room ID '${roomId.trim()}' already exists` })

        const classroom = await Classroom.create({
            roomId: roomId.trim(),
            capacity: Number(capacity),
            floorNo: Number(floorNo),
            nearWashroom: nearWashroom === true || nearWashroom === 'true',
        })

        res.status(201).json(classroom)
    } catch (err) {
        res.status(500).json({ error: 'Server error. Please try again.' })
    }
}

export const getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find().sort({ createdAt: -1 })
        res.json(classrooms)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch classrooms' })
    }
}

export const deleteClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findByIdAndDelete(req.params.id)
        if (!classroom)
            return res.status(404).json({ error: 'Classroom not found' })
        res.json({ message: 'Classroom deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: 'Server error. Please try again.' })
    }
}

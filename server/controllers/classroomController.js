import Classroom from '../models/Classroom.js'

export const createClassroom = async (req, res) => {
    const { roomId, capacity, floorNo, nearWashroom } = req.body

    if (!roomId || roomId.trim() === '') {
        return res.status(400).json({ error: 'Room ID is required' })
    }
    if (capacity === undefined || capacity === null || capacity === '') {
        return res.status(400).json({ error: 'Capacity is required' })
    }
    if (floorNo === undefined || floorNo === null || floorNo === '') {
        return res.status(400).json({ error: 'Floor number is required' })
    }
    if (Number(capacity) < 1) {
        return res.status(400).json({ error: 'Capacity must be at least 1' })
    }
    if (Number(floorNo) < 0) {
        return res.status(400).json({ error: 'Floor number cannot be negative' })
    }

    const existing = await Classroom.findOne({ roomId: roomId.trim() })
    if (existing) {
        return res.status(409).json({ error: `Room ID '${roomId}' already exists` })
    }

    const classroom = await Classroom.create({
        roomId: roomId.trim(),
        capacity: Number(capacity),
        floorNo: Number(floorNo),
        nearWashroom: Boolean(nearWashroom),
    })

    res.status(201).json(classroom)
}

export const getClassrooms = async (req, res) => {
    const classrooms = await Classroom.find().sort({ createdAt: -1 })
    res.json(classrooms)
}

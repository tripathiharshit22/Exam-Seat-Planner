import Classroom from '../models/Classroom.js'

export const allocateExam = async (req, res) => {
    const { totalStudents } = req.body

    if (totalStudents === undefined || totalStudents === null || totalStudents === '') {
        return res.status(400).json({ error: 'totalStudents is required' })
    }

    const parsed = Number(totalStudents)

    if (!Number.isInteger(parsed) || parsed < 1) {
        return res.status(400).json({ error: 'totalStudents must be a positive integer' })
    }

    const classrooms = await Classroom.find().sort({ floorNo: 1 })

    const totalCapacity = classrooms.reduce((sum, room) => sum + room.capacity, 0)
    if (totalCapacity < parsed) {
        return res.status(400).json({ error: 'Not enough seats available' })
    }

    const allocated = []
    let remaining = parsed

    for (const room of classrooms) {
        if (remaining <= 0) break
        allocated.push({
            roomId: room.roomId,
            capacity: room.capacity,
            floorNo: room.floorNo,
        })
        remaining -= room.capacity
    }

    res.json({ totalStudents: parsed, allocatedRooms: allocated })
}

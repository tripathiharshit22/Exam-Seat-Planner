import Classroom from '../models/Classroom.js'

export const allocateExam = async (req, res) => {
    try {
        const { totalStudents } = req.body

        if (totalStudents === undefined || totalStudents === null || String(totalStudents).trim() === '')
            return res.status(400).json({ error: 'totalStudents is required' })

        const parsed = Number(totalStudents)

        if (isNaN(parsed) || !Number.isInteger(parsed) || parsed < 1)
            return res.status(400).json({ error: 'totalStudents must be a positive integer' })

        const classrooms = await Classroom.find().sort({ floorNo: 1 })

        if (classrooms.length === 0)
            return res.status(400).json({ error: 'No classrooms available' })

        const totalCapacity = classrooms.reduce((sum, room) => sum + room.capacity, 0)

        if (totalCapacity < parsed)
            return res.status(400).json({ error: 'Not enough seats available' })

        const allocatedRooms = []
        let remaining = parsed

        for (const room of classrooms) {
            if (remaining <= 0) break
            const studentsAssigned = Math.min(room.capacity, remaining)
            allocatedRooms.push({
                roomId: room.roomId,
                floorNo: room.floorNo,
                capacity: room.capacity,
                studentsAssigned,
            })
            remaining -= studentsAssigned
        }

        res.json({
            totalRequested: parsed,
            totalAllocated: parsed - remaining,
            allocatedRooms,
        })
    } catch (err) {
        res.status(500).json({ error: 'Server error. Please try again.' })
    }
}

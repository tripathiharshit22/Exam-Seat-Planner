import { useState } from 'react'
import { allocateExam } from '../services/classroomService'

function AllocateExam() {
    const [totalStudents, setTotalStudents] = useState('')
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setResult(null)

        if (totalStudents === '' || isNaN(Number(totalStudents)) ||
            !Number.isInteger(Number(totalStudents)) || Number(totalStudents) < 1) {
            return setError('Enter a valid positive whole number')
        }

        setLoading(true)
        try {
            const data = await allocateExam(Number(totalStudents))
            setResult(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Allocate Exam Rooms</h2>

            <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
                <input
                    type="number"
                    value={totalStudents}
                    onChange={(e) => setTotalStudents(e.target.value)}
                    placeholder="Total students"
                    min="1"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Allocating...' : 'Allocate'}
                </button>
            </form>

            {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4">{error}</p>
            )}

            {result && (
                <div>
                    <p className="text-sm text-gray-600 mb-3">
                        Allocated <span className="font-medium text-gray-800">{result.allocatedRooms.length}</span> room(s) for{' '}
                        <span className="font-medium text-gray-800">{result.totalStudents}</span> students
                    </p>
                    <div className="space-y-2">
                        {result.allocatedRooms.map((room) => (
                            <div
                                key={room.roomId}
                                className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 bg-white"
                            >
                                <span className="font-medium text-gray-800">{room.roomId}</span>
                                <div className="flex gap-4 text-sm text-gray-500">
                                    <span>Floor {room.floorNo}</span>
                                    <span>Capacity: {room.capacity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllocateExam

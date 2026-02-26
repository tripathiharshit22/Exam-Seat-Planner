import { useEffect, useState } from 'react'
import { fetchClassrooms, deleteClassroom } from '../services/classroomService'

function ClassroomList() {
    const [classrooms, setClassrooms] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchClassrooms()
                setClassrooms(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            await deleteClassroom(id)
            setClassrooms((prev) => prev.filter((r) => r._id !== id))
        } catch (err) {
            setError(err.message)
        } finally {
            setDeletingId(null)
        }
    }

    if (loading) {
        return <p className="text-sm text-gray-500">Loading classrooms...</p>
    }

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Classrooms</h2>

            {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4">{error}</p>
            )}

            {classrooms.length === 0 && !error && (
                <p className="text-sm text-gray-500">No classrooms added yet.</p>
            )}

            {classrooms.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-md">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left border-b border-gray-200">Room ID</th>
                                <th className="px-4 py-3 text-left border-b border-gray-200">Capacity</th>
                                <th className="px-4 py-3 text-left border-b border-gray-200">Floor No</th>
                                <th className="px-4 py-3 text-left border-b border-gray-200">Near Washroom</th>
                                <th className="px-4 py-3 text-left border-b border-gray-200"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {classrooms.map((room) => (
                                <tr key={room._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-800">{room.roomId}</td>
                                    <td className="px-4 py-3 text-gray-600">{room.capacity}</td>
                                    <td className="px-4 py-3 text-gray-600">{room.floorNo}</td>
                                    <td className="px-4 py-3 text-gray-600">{room.nearWashroom ? 'Yes' : 'No'}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleDelete(room._id)}
                                            disabled={deletingId === room._id}
                                            className="text-sm text-red-600 hover:text-red-800 disabled:opacity-40"
                                        >
                                            {deletingId === room._id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ClassroomList

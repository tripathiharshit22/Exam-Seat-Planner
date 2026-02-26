import { useState } from 'react'
import { addClassroom } from '../services/classroomService'

function AddClassroom() {
    const [form, setForm] = useState({
        roomId: '',
        capacity: '',
        floorNo: '',
        nearWashroom: false,
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!form.roomId.trim()) return setError('Room ID is required')
        if (form.capacity === '') return setError('Capacity is required')
        if (form.floorNo === '') return setError('Floor number is required')

        const cap = Number(form.capacity)
        const floor = Number(form.floorNo)

        if (isNaN(cap) || !Number.isInteger(cap) || cap < 1)
            return setError('Capacity must be a positive integer')
        if (isNaN(floor) || !Number.isInteger(floor) || floor < 0)
            return setError('Floor number must be a non-negative integer')

        setLoading(true)
        try {
            await addClassroom(form)
            setSuccess('Classroom added successfully')
            setForm({ roomId: '', capacity: '', floorNo: '', nearWashroom: false })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Classroom</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room ID</label>
                    <input
                        type="text"
                        name="roomId"
                        value={form.roomId}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. A101"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <input
                        type="number"
                        name="capacity"
                        value={form.capacity}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 40"
                        min="1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Floor No</label>
                    <input
                        type="number"
                        name="floorNo"
                        value={form.floorNo}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 2"
                        min="0"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="nearWashroom"
                        id="nearWashroom"
                        checked={form.nearWashroom}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="nearWashroom" className="text-sm text-gray-700">Near Washroom</label>
                </div>

                {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
                )}
                {success && (
                    <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md px-3 py-2">{success}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Adding...' : 'Add Classroom'}
                </button>
            </form>
        </div>
    )
}

export default AddClassroom

import API_BASE_URL from './api'

export const addClassroom = async (data) => {
    const res = await fetch(`${API_BASE_URL}/classrooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Something went wrong')
    return json
}

export const fetchClassrooms = async () => {
    const res = await fetch(`${API_BASE_URL}/classrooms`)
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Failed to fetch classrooms')
    return json
}

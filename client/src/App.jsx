import { useState } from 'react'
import AddClassroom from './pages/AddClassroom'
import ClassroomList from './pages/ClassroomList'

const tabs = [
    { id: 'list', label: 'Classrooms' },
    { id: 'add', label: 'Add Classroom' },
]

function App() {
    const [activeTab, setActiveTab] = useState('list')

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800">Exam Seat Planner</h1>
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex gap-1 border-b border-gray-200 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'list' && <ClassroomList />}
                {activeTab === 'add' && <AddClassroom />}
            </div>
        </div>
    )
}

export default App

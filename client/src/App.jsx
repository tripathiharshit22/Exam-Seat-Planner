import Home from './pages/Home'

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800">My App</h1>
            </nav>
            <main className="max-w-5xl mx-auto px-6 py-10">
                <Home />
            </main>
        </div>
    )
}

export default App

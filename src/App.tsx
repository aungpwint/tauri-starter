import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { invoke } from '@tauri-apps/api/core'
import './index.css'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function App() {
    const [greetMsg, setGreetMsg] = useState('')
    const [name, setName] = useState('')

    async function greet() {
        setGreetMsg(await invoke('greet', { name }))
    }

    return (
        <main className="container mx-auto p-6">
            <Card className="text-center max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl text-gray-800 dark:text-white">
                        Welcome to Tauri + React
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-center items-center gap-6 mb-6 flex-wrap">
                        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/vite.svg"
                                className="w-16 h-16 hover:scale-110 transition-transform"
                                alt="Vite logo"
                            />
                        </a>
                        <a href="https://tauri.app" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/tauri.svg"
                                className="w-16 h-16 hover:scale-110 transition-transform"
                                alt="Tauri logo"
                            />
                        </a>
                        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                            <img
                                src={reactLogo}
                                className="w-16 h-16 hover:scale-110 transition-transform"
                                alt="React logo"
                            />
                        </a>
                    </div>

                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                        Click on the Tauri, Vite, and React logos to learn more.
                    </p>

                    <form
                        className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
                        onSubmit={(e) => {
                            e.preventDefault()
                            greet()
                        }}
                    >
                        <Input
                            id="greet-input"
                            onChange={(e) => setName(e.currentTarget.value)}
                            placeholder="Enter a name..."
                            className="max-w-xs"
                        />
                        <Button type="submit">Greet</Button>
                    </form>

                    <p className="text-lg font-medium text-gray-700 dark:text-white">{greetMsg}</p>
                </CardContent>
            </Card>
        </main>
    )
}

export default App

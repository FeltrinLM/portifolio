import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ThemeToggle } from './components/ThemeToggle';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';

function ConteudoDasPaginas() {
    return (
        <main className="pb-[300px] p-10">
            <Routes>
                <Route path="/" element={<Navigate to="/sobre" replace />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/experiencia" element={<Experience />} />
                <Route path="/projetos" element={<Projects />} />
                <Route path="/contato" element={<Contact />} />
            </Routes>
        </main>
    );
}

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    function handleThemeChange(newTheme) {
        setIsDarkMode(newTheme);
    }

    return (
        <BrowserRouter>
            <div className={`relative min-h-screen overflow-x-hidden font-serif transition-colors duration-500 ${isDarkMode ? 'dark bg-[#3B381E]' : 'bg-[#D0C697]'}`}>
                <ConteudoDasPaginas />

                <div className="absolute inset-0 pointer-events-none z-50">
                    <ThemeToggle
                        isDarkMode={isDarkMode}
                        onThemeChange={handleThemeChange}
                    />
                    <div className="pointer-events-auto">
                        <Navbar />
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}
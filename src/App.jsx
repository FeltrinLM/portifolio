import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';

function ConteudoDasPaginas({ language }) {
    return (
        <main className="pb-[300px] p-10">
            <Routes>
                <Route path="/" element={<Navigate to="/sobre" replace />} />
                <Route path="/sobre" element={<About language={language} />} />
                <Route path="/experiencia" element={<Experience language={language} />} />
                <Route path="/projetos" element={<Projects language={language} />} />
                <Route path="/contato" element={<Contact language={language} />} />
            </Routes>
        </main>
    );
}

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('br');

    function handleThemeChange(newTheme) {
        setIsDarkMode(newTheme);
    }

    function handleLanguageChange(newLang) {
        setLanguage(newLang);
    }

    return (
        <BrowserRouter>
            <div className={`relative min-h-screen overflow-x-hidden font-serif transition-colors duration-500 ${isDarkMode ? 'dark bg-[#3B381E]' : 'bg-[#D0C697]'}`}>
                <ConteudoDasPaginas language={language} />

                <div className="absolute inset-0 pointer-events-none z-50">
                    <ThemeToggle
                        isDarkMode={isDarkMode}
                        onThemeChange={handleThemeChange}
                    />

                    <LanguageToggle
                        language={language}
                        onLanguageChange={handleLanguageChange}
                    />

                    <div className="pointer-events-auto">
                        <Navbar language={language} />
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}
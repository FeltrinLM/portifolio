import { useState } from 'react';
import { flushSync } from 'react-dom';
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

    // Agora a aura também tem a propriedade 'visible'
    const [aura, setAura] = useState({ x: 0, y: 0, visible: false });

    function handleThemeChange(newTheme) {
        if (!document.startViewTransition) {
            setIsDarkMode(newTheme);
            return;
        }
        document.startViewTransition(() => {
            flushSync(() => setIsDarkMode(newTheme));
        });
    }

    return (
        <BrowserRouter>
            <div className="relative min-h-screen overflow-x-hidden font-serif">

                {/* CAMADA 1: O TEMA BASE */}
                <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#3B381E]' : 'bg-[#D0C697]'}`}>
                    <ConteudoDasPaginas />
                </div>

                {/*
            CAMADA 2: A AURA (O mundo invertido)
            Adicionamos transição de opacidade! Fica invisível quando aura.visible é falso.
        */}
                <div
                    className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 ease-out ${
                        !isDarkMode ? 'dark bg-[#3B381E]' : 'bg-[#D0C697]'
                    } ${aura.visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        // Reduzido para 75px para ficar uma "lanterna" menor e mais focada
                        clipPath: `circle(75px at ${aura.x}px ${aura.y}px)`
                    }}
                    aria-hidden="true"
                >
                    <ConteudoDasPaginas />
                </div>

                {/* CAMADA 3: A INTERFACE */}
                <div className="absolute inset-0 pointer-events-none z-50">
                    <ThemeToggle
                        isDarkMode={isDarkMode}
                        onThemeChange={handleThemeChange}
                        setAura={setAura}
                    />
                    <div className="pointer-events-auto">
                        <Navbar />
                    </div>
                </div>

            </div>
        </BrowserRouter>
    );
}
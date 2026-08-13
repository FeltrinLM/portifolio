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
    const [aura, setAura] = useState({ x: 0, y: 0, visible: false });

    // A MÁGICA FOI CORRIGIDA AQUI:
    // Retiramos o useEffect e a dupla chamada de transição.
    // Agora o ThemeToggle cuida da animação, e o App apenas aplica a classe IMEDIATAMENTE.
    function handleThemeChange(newTheme) {
        setIsDarkMode(newTheme);

        // Aplica a classe do Tailwind de forma síncrona,
        // garantindo que a "fotografia" da transição capture as novas cores!
        if (newTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    return (
        <BrowserRouter>
            <div className="relative min-h-screen overflow-x-hidden font-serif">

                {/* CAMADA 1: O TEMA BASE */}
                <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#3B381E]' : 'bg-[#D0C697]'}`}>
                    <ConteudoDasPaginas />
                </div>

                {/* CAMADA 2: A AURA */}
                <div
                    className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 ease-out ${
                        !isDarkMode ? 'dark bg-[#3B381E]' : 'bg-[#D0C697]'
                    } ${aura.visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{
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
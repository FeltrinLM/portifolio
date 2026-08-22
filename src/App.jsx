import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { ResumeCard } from './components/ResumeCard';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';

// --- COMPONENTE NOVO QUE RESOLVE O SCROLL ---
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); // Sempre que o pathname (URL) mudar, ele roda esse useEffect

    return null; // Não renderiza nada visualmente
}
// ---------------------------------------------

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
            {/* O componente precisa ficar dentro do BrowserRouter para ter acesso ao useLocation */}
            <ScrollToTop />

            <div className={`relative min-h-screen overflow-x-hidden font-serif transition-colors duration-500 ${isDarkMode ? 'dark bg-[#3B381E]' : 'bg-[#D0C697]'}`}>

                {/* O conteúdo principal do site (as páginas que mudam) */}
                <ConteudoDasPaginas language={language} />

                {/* --- WIDGETS GLOBAIS FLUTUANTES --- */}

                {/* A carta de currículo fixa no canto inferior direito */}
                <ResumeCard language={language} />

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
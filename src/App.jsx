import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { ResumeCard } from './components/ResumeCard';
import { Tutorial } from './components/Tutorial';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

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
    // TODO: REMOVER ANTES DO MERGE!
    // Voltar para: const [showTutorial, setShowTutorial] = useState(() => localStorage.getItem('theme_tutorial_done') !== 'true');
    const [showTutorial, setShowTutorial] = useState(true);

    // TODO: REMOVER ANTES DO MERGE! (Se quiser que guarde a preferência do usuário)
    // Atualmente forçando o dark mode inicialmente para garantir que o tutorial funcione no F5
    const [isDarkMode, setIsDarkMode] = useState(true);

    const [language, setLanguage] = useState('br');

    function handleThemeChange(newTheme) {
        setIsDarkMode(newTheme);
    }

    function handleLanguageChange(newLang) {
        setLanguage(newLang);
    }

    function handleTutorialComplete() {
        setShowTutorial(false);
        // localStorage.setItem('theme_tutorial_done', 'true'); // Opcional: pode deixar comentado por enquanto
    }

    return (
        <BrowserRouter>
            <ScrollToTop />

            <div className={`relative min-h-screen overflow-x-hidden font-serif transition-colors duration-500 ${isDarkMode ? 'dark bg-[#272516]' : 'bg-[#D0C697]'}`}>

                {showTutorial && (
                    <Tutorial
                        isDarkMode={isDarkMode}
                        onTutorialComplete={handleTutorialComplete}
                    />
                )}

                <div className={`transition-opacity duration-1000 ${showTutorial ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <ConteudoDasPaginas language={language} />
                    <ResumeCard language={language} />
                </div>

                <div className="absolute inset-0 pointer-events-none z-50">
                    <ThemeToggle
                        isDarkMode={isDarkMode}
                        onThemeChange={handleThemeChange}
                        tutorialMode={showTutorial}
                    />

                    <div className={`transition-opacity duration-1000 ${showTutorial ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                        <LanguageToggle
                            language={language}
                            onLanguageChange={handleLanguageChange}
                        />
                        <Navbar language={language} />
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}
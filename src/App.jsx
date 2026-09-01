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
    // Checa o localStorage na inicialização. Se já completou, vai direto pro site.
    const [tutorialPhase, setTutorialPhase] = useState(() => localStorage.getItem('tutorial_done') ? 'done' : 'theme');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [language, setLanguage] = useState('br');

    function handleThemeChange(newTheme) {
        setIsDarkMode(newTheme);
    }

    function handleLanguageChange(newLang) {
        setLanguage(newLang);
    }

    function handleNextPhase(nextPhase) {
        setTutorialPhase(nextPhase);
        if (nextPhase === 'done') {
            localStorage.setItem('tutorial_done', 'true');
        }
    }

    const phaseOrder = ['theme', 'empty_after_theme', 'language', 'empty_after_language', 'navbar', 'done'];
    const currentIndex = phaseOrder.indexOf(tutorialPhase);

    const showThemeToggle = currentIndex >= phaseOrder.indexOf('theme');
    const showLanguageToggle = currentIndex >= phaseOrder.indexOf('language');
    const showNavbar = currentIndex >= phaseOrder.indexOf('navbar');

    return (
        <BrowserRouter>
            <ScrollToTop />

            <div className={`relative min-h-screen overflow-x-hidden font-serif transition-colors duration-500 ${isDarkMode ? 'dark bg-[#272516]' : 'bg-[#D0C697]'}`}>

                {tutorialPhase !== 'done' && (
                    <Tutorial
                        isDarkMode={isDarkMode}
                        tutorialPhase={tutorialPhase}
                        onNextPhase={handleNextPhase}
                        language={language}
                    />
                )}

                <div className={`transition-opacity duration-1000 ${tutorialPhase !== 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <ConteudoDasPaginas language={language} />
                    <ResumeCard language={language} />
                </div>

                <div className="absolute inset-0 pointer-events-none z-50">

                    <div className={`transition-opacity duration-1000 ${showThemeToggle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <ThemeToggle
                            isDarkMode={isDarkMode}
                            onThemeChange={handleThemeChange}
                            tutorialMode={tutorialPhase === 'theme'}
                        />
                    </div>

                    <div className={`transition-opacity duration-1000 ${showLanguageToggle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <LanguageToggle
                            language={language}
                            onLanguageChange={handleLanguageChange}
                            tutorialMode={tutorialPhase === 'language'}
                            onTutorialComplete={() => handleNextPhase('empty_after_language')}
                        />
                    </div>

                    <div className={`transition-opacity duration-1000 ${showNavbar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <Navbar
                            language={language}
                            tutorialMode={tutorialPhase === 'navbar'}
                            onTutorialComplete={() => handleNextPhase('done')}
                        />
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}
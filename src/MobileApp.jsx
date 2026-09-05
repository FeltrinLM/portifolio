import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { Tutorial } from './components/Tutorial';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';

function ConteudoDasPaginasMobile({ language }) {
    return (
        <main className="pb-24 p-4">
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

export default function MobileApp({
                                      tutorialPhase,
                                      isDarkMode,
                                      language,
                                      handleThemeChange,
                                      handleLanguageChange,
                                      handleNextPhase
                                  }) {
    const phaseOrder = ['theme', 'empty_after_theme', 'language', 'empty_after_language', 'navbar', 'done'];
    const currentIndex = phaseOrder.indexOf(tutorialPhase);

    const showThemeToggle = currentIndex >= phaseOrder.indexOf('theme');
    const showLanguageToggle = currentIndex >= phaseOrder.indexOf('language');
    const showNavbar = currentIndex >= phaseOrder.indexOf('navbar');

    return (
        <div className={`min-h-screen flex flex-col font-serif transition-colors duration-500 ${isDarkMode ? 'dark bg-[#272516]' : 'bg-[#D0C697]'}`}>

            <div className="flex justify-between items-center p-4 z-50">
                {showThemeToggle && (
                    <ThemeToggle
                        isDarkMode={isDarkMode}
                        onThemeChange={handleThemeChange}
                        tutorialMode={tutorialPhase === 'theme'}
                    />
                )}

                {showLanguageToggle && (
                    <LanguageToggle
                        language={language}
                        onLanguageChange={handleLanguageChange}
                        tutorialMode={tutorialPhase === 'language'}
                        onTutorialComplete={() => handleNextPhase('empty_after_language')}
                    />
                )}
            </div>

            {tutorialPhase !== 'done' && (
                <div className="z-50 px-4">
                    <Tutorial
                        isDarkMode={isDarkMode}
                        tutorialPhase={tutorialPhase}
                        onNextPhase={handleNextPhase}
                        language={language}
                    />
                </div>
            )}

            <div className={`flex-1 transition-opacity duration-1000 ${tutorialPhase !== 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <ConteudoDasPaginasMobile language={language} />
            </div>

            {showNavbar && (
                <div className="fixed bottom-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-t border-gray-500/30">
                    <Navbar
                        language={language}
                        tutorialMode={tutorialPhase === 'navbar'}
                        onTutorialComplete={() => handleNextPhase('done')}
                    />
                </div>
            )}
        </div>
    );
}
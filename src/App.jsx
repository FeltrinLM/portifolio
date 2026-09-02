import { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// Importação das duas árvores separadas
import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default function App() {
    // 1. Detecta se é mobile (telas menores que 768px)
    const isMobile = useMediaQuery({ maxWidth: 768 });

    // 2. Estados globais (movidos para cá para não perder os dados ao redimensionar)
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

    // 3. Agrupamos tudo que as telas vão precisar em um objeto "props"
    const sharedProps = {
        tutorialPhase,
        isDarkMode,
        language,
        handleThemeChange,
        handleLanguageChange,
        handleNextPhase
    };

    return (
        <BrowserRouter>
            <ScrollToTop />
            {/* Renderiza o Mobile ou o Desktop, passando os estados para eles */}
            {isMobile ? (
                <MobileApp {...sharedProps} />
            ) : (
                <DesktopApp {...sharedProps} />
            )}
        </BrowserRouter>
    );
}
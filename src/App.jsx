import { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
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
    const isMobile = useMediaQuery({ maxWidth: 768 });

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

    const sharedProps = {
        tutorialPhase,
        isDarkMode,
        isLanguage: language,
        language,
        handleThemeChange,
        handleLanguageChange,
        handleNextPhase
    };

    return (
        <BrowserRouter>
            <ScrollToTop />
            {isMobile ? (
                <MobileApp {...sharedProps} />
            ) : (
                <DesktopApp {...sharedProps} />
            )}
        </BrowserRouter>
    );
}
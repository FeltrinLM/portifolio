import { useState, useEffect } from 'react';
import { Text } from '../components/Text';
import { BackgroundCarousel } from '../components/BackgroundCarousel';
import fotoPerfil from '../assets/good_looking.jpeg';

const RUNES = "ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛟ ᛞ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ";
const DOUBLE_RUNES = RUNES + " " + RUNES;

export function About({ language = 'br' }) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scale = Math.max(0.6, 1 - scrollY / 600);
    const opacity = Math.max(0, 1 - scrollY / 400);

    return (
        <div className="relative w-full flex flex-col items-center">

            <div
                className="sticky top-12 md:top-24 z-10 w-full flex flex-col items-center justify-center pt-10"
                style={{
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    transformOrigin: 'top center',
                    willChange: 'transform, opacity'
                }}
            >
                <div className="absolute z-0 w-64 h-64 md:w-96 md:h-96 bg-[#4F2B33]/20 dark:bg-[#91B09A]/15 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative w-full max-w-5xl flex items-center justify-center mb-8">

                    <BackgroundCarousel language={language} />

                    <div className="relative z-10 flex items-center justify-center w-72 h-72 md:w-80 md:h-80">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute animate-[spin_40s_linear_infinite] text-[#4F2B33]/60 dark:text-[#91B09A]/60">
                                <path id="outer-circle" d="M 150, 15 A 135,135 0 1,1 149.9,15" fill="none" />
                                <text fill="currentColor" fontSize="11" letterSpacing="6" fontWeight="bold">
                                    <textPath href="#outer-circle" startOffset="0%">
                                        {DOUBLE_RUNES}
                                    </textPath>
                                </text>
                            </svg>

                            <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute animate-[spin_30s_linear_infinite_reverse] text-[#4F2B33]/80 dark:text-[#91B09A]/80">
                                <path id="inner-circle" d="M 150, 32 A 118,118 0 1,1 149.9,32" fill="none" />
                                <text fill="currentColor" fontSize="9" letterSpacing="8" fontWeight="bold">
                                    <textPath href="#inner-circle" startOffset="0%">
                                        {RUNES}
                                    </textPath>
                                </text>
                            </svg>
                        </div>

                        <img
                            src={fotoPerfil}
                            alt="Lorenzo Feltrin"
                            className="relative z-10 w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-2 border-[#4F2B33] dark:border-[#91B09A] shadow-[0_0_40px_rgba(79,43,51,0.6)] dark:shadow-[0_0_40px_rgba(145,176,154,0.4)] bg-[#D0C697] dark:bg-[#3B381E]"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 text-center z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]">
                    <Text variant="title" as="h1" className="text-5xl md:text-7xl font-bold text-[#4F2B33] dark:text-[#D0C697] tracking-wide">
                        Lorenzo Feltrin
                    </Text>

                    <Text variant="text" as="h2" className="text-lg md:text-xl text-[#4F2B33] dark:text-[#91B09A] tracking-[0.3em] uppercase font-bold">
                        {language === 'en' ? 'ᚨ Software Developer ᚨ' : 'ᚨ Desenvolvedor de Software ᚨ'}
                    </Text>
                </div>
            </div>

            <div className="h-[150vh] w-full"></div>

        </div>
    );
}
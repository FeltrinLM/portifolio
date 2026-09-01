import { useEffect, useRef } from 'react';

export function Tutorial({ isDarkMode, tutorialPhase, onNextPhase, language }) {
    const initialLanguage = useRef(language);

    useEffect(() => {
        // Fase 1: Tema
        if (tutorialPhase === 'theme' && !isDarkMode) {
            const timer = setTimeout(() => {
                onNextPhase('empty_after_theme');
            }, 1000);
            return () => clearTimeout(timer);
        }

        // Intervalo 1
        if (tutorialPhase === 'empty_after_theme') {
            const timer = setTimeout(() => {
                onNextPhase('language');
            }, 1000);
            return () => clearTimeout(timer);
        }

        // Intervalo 2
        if (tutorialPhase === 'empty_after_language') {
            const timer = setTimeout(() => {
                onNextPhase('navbar');
            }, 1000);
            return () => clearTimeout(timer);
        }

    }, [isDarkMode, tutorialPhase, onNextPhase, language]);

    if (tutorialPhase === 'done') return null;

    const topTextBr = "Para progredir, basta clicar pelo menos uma vez na moeda e arrastá-la para o espaço destacado.";
    const topTextEn = "To progress, simply click the coin at least once and drag it to the highlighted space.";

    const bottomTextBr = "Não entendeu alguma coisa? É só clicar na moeda.";
    const bottomTextEn = "Didn't understand something? Just click the coin.";

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">

            {/* Ato 1 (Tema) */}
            <div className={`absolute bottom-[calc(50vh+80px)] left-1/2 -translate-x-1/2 w-full max-w-lg text-center px-6 transition-opacity duration-1000 ${tutorialPhase === 'theme' ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-2xl md:text-3xl text-[#4F2B33] dark:text-[#D0C697] font-serif tracking-wide leading-relaxed">
                    Está escuro, não é? <br /><br />
                    Talvez se você pegar aquele sol e arrastar para onde a lua está, dê uma clareada.
                </h2>
            </div>

            {/* Ato 2 (Idioma) */}
            <div className={`absolute bottom-[calc(50vh+80px)] left-1/2 -translate-x-1/2 w-full max-w-2xl text-center px-6 transition-opacity duration-1000 ${tutorialPhase === 'language' ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-2xl md:text-3xl text-[#4F2B33] dark:text-[#D0C697] font-serif tracking-wide leading-relaxed transition-all duration-500">
                    {language === 'br' ? topTextBr : topTextEn}
                </h2>
            </div>
            <div className={`absolute top-[calc(50vh+80px)] left-1/2 -translate-x-1/2 w-full max-w-lg text-center px-6 transition-opacity duration-1000 ${tutorialPhase === 'language' ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-xl md:text-2xl text-[#4F2B33]/80 dark:text-[#D0C697]/80 font-serif tracking-wide leading-relaxed transition-all duration-500">
                    {language === 'br' ? bottomTextEn : bottomTextBr}
                </h2>
            </div>

            {/* Ato 3 (Navbar) */}
            <div className={`absolute bottom-[calc(50vh+120px)] left-1/2 -translate-x-1/2 w-full max-w-lg text-center px-6 transition-opacity duration-1000 ${tutorialPhase === 'navbar' ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-2xl md:text-3xl text-[#4F2B33] dark:text-[#D0C697] font-serif tracking-wide leading-relaxed">
                    {language === 'br'
                        ? <>E pra finalizar, basta pegar uma dessas opções e arrastá-la para o círculo.<br/><br/>Bem-vindo ao meu portfólio!</>
                        : <>And finally, just grab one of these options and drag it to the circle.<br/><br/>Welcome to my portfolio!</>
                    }
                </h2>
            </div>

        </div>
    );
}
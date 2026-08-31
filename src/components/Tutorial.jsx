import { useEffect } from 'react';

export function Tutorial({ isDarkMode, tutorialPhase, onNextPhase, language }) {
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

        // Intervalo 2 (Preparando para a Navbar)
        if (tutorialPhase === 'empty_after_language') {
            const timer = setTimeout(() => {
                onNextPhase('navbar');
            }, 1000);
            return () => clearTimeout(timer);
        }

        // A conclusão da fase 'language' agora é disparada de dentro do componente LanguageToggle!

    }, [isDarkMode, tutorialPhase, onNextPhase]);

    if (tutorialPhase === 'done') return null;

    // Textos dinâmicos baseados no idioma selecionado na moeda
    const topTextBr = "Para progredir, basta clicar pelo menos uma vez na moeda e arrastá-la para o espaço destacado.";
    const topTextEn = "To progress, simply click the coin at least once and drag it to the highlighted space.";

    const bottomTextBr = "Não entendeu alguma coisa? É só clicar na moeda.";
    const bottomTextEn = "Didn't understand something? Just click the coin.";

    return (
        // MUDANÇA: Removido o 'bg-[#272516]'. Agora o fundo do App (Modo Claro) aparece!
        <div className="fixed inset-0 z-50 pointer-events-none">

            {/* Texto do Ato 1 (Tema) */}
            <div className={`absolute bottom-[calc(50vh+80px)] left-1/2 -translate-x-1/2 w-full max-w-lg text-center px-6 transition-opacity duration-1000 ${tutorialPhase === 'theme' ? 'opacity-100' : 'opacity-0'}`}>
                {/* MUDANÇA: Adicionado text-[#4F2B33] para quando o fundo clarear */}
                <h2 className="text-2xl md:text-3xl text-[#4F2B33] dark:text-[#D0C697] font-serif tracking-wide leading-relaxed">
                    Está escuro, não é? <br /><br />
                    Talvez se você pegar aquele sol e arrastar para onde a lua está, dê uma clareada.
                </h2>
            </div>

            {/* Texto do Ato 2 (Idioma) - Topo */}
            <div className={`absolute bottom-[calc(50vh+80px)] left-1/2 -translate-x-1/2 w-full max-w-2xl text-center px-6 transition-opacity duration-1000 ${tutorialPhase === 'language' ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-2xl md:text-3xl text-[#4F2B33] dark:text-[#D0C697] font-serif tracking-wide leading-relaxed transition-all duration-500">
                    {language === 'br' ? topTextBr : topTextEn}
                </h2>
            </div>

            {/* Texto do Ato 2 (Idioma) - Baixo */}
            <div className={`absolute top-[calc(50vh+80px)] left-1/2 -translate-x-1/2 w-full max-w-lg text-center px-6 transition-opacity duration-1000 ${tutorialPhase === 'language' ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-xl md:text-2xl text-[#4F2B33]/80 dark:text-[#D0C697]/80 font-serif tracking-wide leading-relaxed transition-all duration-500">
                    {language === 'br' ? bottomTextEn : bottomTextBr}
                </h2>
            </div>

        </div>
    );
}
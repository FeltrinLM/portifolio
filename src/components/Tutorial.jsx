import { useEffect } from 'react';

export function Tutorial({ isDarkMode, onTutorialComplete }) {
    useEffect(() => {
        if (!isDarkMode) {
            const timer = setTimeout(() => {
                onTutorialComplete();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isDarkMode, onTutorialComplete]);

    return (
        <div className={`fixed inset-0 z-50 bg-[#272516] pointer-events-none transition-opacity duration-1000 ${!isDarkMode ? 'opacity-0' : 'opacity-100'}`}>

            {/* MUDANÇA AQUI: Removido o 'animate-pulse' para deixar a cor sólida */}
            <div className="absolute bottom-[calc(50vh+80px)] left-1/2 -translate-x-1/2 w-full max-w-lg text-center px-6">
                <h2 className="text-2xl md:text-3xl text-[#D0C697] font-serif tracking-wide leading-relaxed">
                    Está escuro, não é? <br /><br />
                    Talvez se você pegar aquele sol e arrastar para onde a lua está, dê uma clareada.
                </h2>
            </div>

        </div>
    );
}
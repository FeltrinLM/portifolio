import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'; // <-- 1. Importe o hook
import { Text } from './Text';

export function ResumeCard({ language = 'br', className = '' }) {
    // 2. Hook de detecção
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const url = language === 'en' ? '/cv/cv_lorenzo_en.pdf' : '/cv/cv_lorenzo_br.pdf';

    const [showBubble, setShowBubble] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const messagesBr = ['Ei...', 'Eu tô aqui!', 'Clica em mim', 'Psiu...'];
    const messagesEn = ['Hey...', 'I am here!', 'Click me', 'Psst...'];
    const messages = language === 'en' ? messagesEn : messagesBr;

    useEffect(() => {
        const interval = setInterval(() => {
            setShowBubble(true);

            setTimeout(() => {
                setShowBubble(false);

                setTimeout(() => {
                    setMessageIndex((prev) => (prev + 1) % messages.length);
                }, 500);
            }, 3000);

        }, 12000);

        return () => clearInterval(interval);
    }, [messages.length]);

    // ----------------------------------------------------------------------
    // 3. A INTERCEPTAÇÃO MOBILE
    // ----------------------------------------------------------------------
    if (isMobile) {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                // No mobile, removemos os efeitos de hover complexos e colocamos ele no topo
                // para não conflitar com a Bottom Navbar que criamos.
                className={`fixed right-4 top-[80px] z-[40] w-14 h-24 flex items-end justify-center active:scale-95 transition-transform duration-200 cursor-pointer ${className}`}
            >
                {/* --- BALÃO DE FALA (Mobile) --- */}
                {/* Posicionado ao lado esquerdo da carta para não sair da tela */}
                <div
                    className={`absolute top-2 right-[120%] whitespace-nowrap px-3 py-1.5 bg-[#4F2B33] dark:bg-[#91B09A] text-[#D0C697] dark:text-[#3B381E] text-[10px] font-bold rounded-lg shadow-lg transition-all duration-300 z-30 
                    ${showBubble ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}
                >
                    {messages[messageIndex]}
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#4F2B33] dark:bg-[#91B09A] rotate-45"></div>
                </div>

                {/* --- A CARTA (Mobile) --- */}
                <div
                    className="relative w-12 h-20 md:w-16 md:h-28 z-20 mb-2 shadow-lg border border-[#D0C697]/20 dark:border-[#3B381E]/20 bg-[#4F2B33] dark:bg-[#91B09A] rounded-md flex flex-col items-center justify-center gap-1 overflow-hidden"
                >
                    <div className="text-[#D0C697] dark:text-[#3B381E]">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                            <circle cx="12" cy="9" r="3"/>
                            <path d="M7 19c0-3.5 10-3.5 10 0"/>
                        </svg>
                    </div>
                    <Text variant="title" as="span" className="text-[9px] font-bold text-[#D0C697] dark:text-[#3B381E] tracking-widest uppercase">
                        CV
                    </Text>
                </div>
            </a>
        );
    }

    // ----------------------------------------------------------------------
    // 4. A VERSÃO DESKTOP INTACTA
    // ----------------------------------------------------------------------
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // HITBOX EXPANDIDA: w-28 h-40
            className={`fixed right-4 md:right-8 bottom-0 z-[100] w-28 h-40 flex items-end justify-center group transition-all duration-700 ease-in-out translate-y-[45%] hover:-translate-y-4 hover:-rotate-[12deg] cursor-pointer ${className}`}
            style={{ perspective: '1000px' }}
        >
            {/* --- ESTILOS INJETADOS --- */}
            <style>{`
                @keyframes slow-3d-spin {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(360deg); }
                }
                
                @keyframes sparkle-float {
                    0% { opacity: 0; transform: translateY(0px) scale(0) rotate(0deg); }
                    50% { opacity: 0.8; transform: translateY(-15px) scale(1.2) rotate(90deg); }
                    100% { opacity: 0; transform: translateY(-30px) scale(0) rotate(180deg); }
                }
                
                .group:hover .spin-magic {
                    animation: slow-3d-spin 5s linear infinite;
                    animation-delay: 0.7s;
                }

                .group:hover .sparkle {
                    animation: sparkle-float 2.5s ease-in-out infinite;
                }
                
                .group:hover .s-1 { animation-delay: 0.7s; }
                .group:hover .s-2 { animation-delay: 1.1s; }
                .group:hover .s-3 { animation-delay: 1.8s; }
                .group:hover .s-4 { animation-delay: 2.3s; }
                .group:hover .s-5 { animation-delay: 2.9s; }
                .group:hover .s-6 { animation-delay: 3.5s; }
            `}</style>

            {/* --- BALÃO DE FALA --- */}
            {/* Subimos o balão para bottom-[85%] e aplicamos as cores do Dark Mode */}
            <div
                className={`absolute bottom-[85%] whitespace-nowrap px-3 py-1.5 bg-[#4F2B33] dark:bg-[#91B09A] text-[#D0C697] dark:text-[#3B381E] text-[10px] md:text-[11px] font-bold rounded-lg shadow-lg transition-all duration-300 z-30 
                ${showBubble && !isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
            >
                {messages[messageIndex]}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#4F2B33] dark:bg-[#91B09A] rotate-45"></div>
            </div>

            {/* --- ESTRELINHAS MÍSTICAS ESPALHADAS --- */}
            {/* No Dark Mode, as estrelas brilham na cor #D0C697 */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <span className="sparkle s-1 absolute top-[10%] left-[15%] text-[#4F2B33] dark:text-[#D0C697] text-[14px] opacity-0">✦</span>
                <span className="sparkle s-2 absolute top-[35%] right-[5%] text-[#4F2B33] dark:text-[#D0C697] text-[10px] opacity-0">✦</span>
                <span className="sparkle s-3 absolute bottom-[15%] left-[5%] text-[#4F2B33] dark:text-[#D0C697] text-[16px] opacity-0">✦</span>
                <span className="sparkle s-4 absolute bottom-[10%] right-[15%] text-[#4F2B33] dark:text-[#D0C697] text-[12px] opacity-0">✦</span>
                <span className="sparkle s-5 absolute top-[60%] left-[30%] text-[#4F2B33] dark:text-[#D0C697] text-[9px] opacity-0">✦</span>
                <span className="sparkle s-6 absolute top-[5%] right-[25%] text-[#4F2B33] dark:text-[#D0C697] text-[11px] opacity-0">✦</span>
            </div>

            {/* --- A CARTA 3D --- */}
            <div
                className="spin-magic relative w-14 h-24 md:w-16 md:h-28 z-20 mb-2"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* 1. FACE DA FRENTE */}
                {/* O fundo da carta no dark mode vira #91B09A */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-start pt-3 gap-1.5 rounded-md md:rounded-lg border border-[#D0C697]/20 dark:border-[#3B381E]/20 bg-[#4F2B33] dark:bg-[#91B09A] shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    {/* O Ícone no dark mode assume a cor do fundo do site (#3B381E) para contraste perfeito */}
                    <div className="text-[#D0C697] dark:text-[#3B381E]">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                            <circle cx="12" cy="9" r="3"/>
                            <path d="M7 19c0-3.5 10-3.5 10 0"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-center text-center px-1">
                        <Text variant="title" as="span" className="text-[10px] md:text-[11px] font-bold text-[#D0C697] dark:text-[#3B381E] tracking-widest uppercase">
                            CV
                        </Text>
                    </div>
                </div>

                {/* 2. FACE DE TRÁS (VERSO DA CARTA) */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-md md:rounded-lg border border-[#D0C697]/20 dark:border-[#3B381E]/20 bg-[#4F2B33] dark:bg-[#91B09A] shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="w-[85%] h-[90%] border border-[#D0C697]/10 dark:border-[#3B381E]/20 rounded-sm flex items-center justify-center">
                        <span className="text-[#D0C697]/40 dark:text-[#3B381E]/40 text-sm">✦</span>
                    </div>
                </div>
            </div>
        </a>
    );
}
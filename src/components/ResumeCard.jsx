import { Text } from './Text';

const RUNES = "ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛟ ᛞ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ";
const DOUBLE_RUNES = RUNES + " " + RUNES;

export function ResumeCard({ language = 'br', className = '' }) {
    const url = language === 'en' ? '/cv/cv_lorenzo_en.pdf' : '/cv/cv_lorenzo_br.pdf';
    const title = language === 'en' ? 'Resume' : 'Currículo';
    const subtitle = language === 'en' ? 'Download PDF' : 'Baixar PDF';

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            // O ${className} permite que você ajuste margens ou tamanhos quando for colocá-lo em outras páginas
            className={`group relative flex flex-col items-center justify-center gap-4 w-56 h-56 md:w-64 md:h-64 rounded-full border-2 border-[#4F2B33]/20 dark:border-[#91B09A]/20 bg-[#4F2B33]/[0.02] dark:bg-[#91B09A]/[0.02] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(79,43,51,0.2)] dark:hover:shadow-[0_15px_40px_-10px_rgba(145,176,154,0.1)] hover:bg-[#4F2B33]/5 dark:hover:bg-[#91B09A]/5 overflow-hidden ${className}`}
        >
            {/* Runas Orbitando (Invisíveis até o hover) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute animate-[spin_40s_linear_infinite] text-[#4F2B33]/60 dark:text-[#91B09A]/60">
                    <path id="outer-circle-cv" d="M 150, 15 A 135,135 0 1,1 149.9,15" fill="none" />
                    <text fill="currentColor" fontSize="11" letterSpacing="6" fontWeight="bold">
                        <textPath href="#outer-circle-cv" startOffset="0%">
                            {DOUBLE_RUNES}
                        </textPath>
                    </text>
                </svg>
                <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute animate-[spin_30s_linear_infinite_reverse] text-[#4F2B33]/80 dark:text-[#91B09A]/80">
                    <path id="inner-circle-cv" d="M 150, 32 A 118,118 0 1,1 149.9,32" fill="none" />
                    <text fill="currentColor" fontSize="9" letterSpacing="8" fontWeight="bold">
                        <textPath href="#inner-circle-cv" startOffset="0%">
                            {RUNES}
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* Ícone */}
            <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 text-[#4F2B33] dark:text-[#91B09A] group-hover:scale-110 group-hover:bg-[#4F2B33] group-hover:text-[#D0C697] dark:group-hover:bg-[#91B09A] dark:group-hover:text-[#3B381E] transition-all duration-300">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 10v9m0 0l-3-3m3 3l3-3M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                </svg>
            </div>

            {/* Textos */}
            <div className="relative z-10 flex flex-col items-center gap-1 text-center px-4 max-w-[80%]">
                <Text variant="title" as="h2" className="text-2xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                    {title}
                </Text>
                <Text variant="text" as="span" className="text-xs font-medium text-[#4F2B33]/70 dark:text-[#91B09A]/80 tracking-wide truncate w-full">
                    {subtitle}
                </Text>
            </div>
        </a>
    );
}
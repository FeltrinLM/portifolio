import { useMediaQuery } from 'react-responsive';
import { Text } from '../components/Text';

const RUNES = "ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛟ ᛞ ";
const RUNES_REPEAT = RUNES.repeat(8);

export function Contact({ language = 'br' }) {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const contactLinks = [
        {
            name: 'E-mail',
            value: 'feltrinlorenzo505@gmail.com',
            url: 'mailto:feltrinlorenzo505@gmail.com',
            icon: (
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
            )
        },
        {
            name: 'GitHub',
            value: 'FeltrinLM',
            url: 'https://github.com/FeltrinLM',
            icon: (
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            value: 'lorenzo-feltrin',
            url: 'https://www.linkedin.com/in/lorenzo-feltrin-086870227/',
            icon: (
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                </svg>
            )
        }
    ];

    if (isMobile) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center pt-12 pb-24 px-4 overflow-x-hidden">
                <div className="relative z-20 flex flex-col items-center gap-1 text-center w-full mb-8 mt-4">
                    <Text variant="title" as="h1" className="text-4xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                        {language === 'en' ? 'Contact' : 'Contato'}
                    </Text>
                    <div className="flex items-center gap-3 text-[#4F2B33]/80 dark:text-[#91B09A]/90 mt-1">
                        <div className="w-6 h-px bg-current opacity-40"></div>
                        <Text variant="text" as="p" className="text-base tracking-widest">
                            {language === 'en' ? "So, let's talk?" : 'E aí, vamos conversar?'}
                        </Text>
                        <div className="w-6 h-px bg-current opacity-40"></div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 w-full items-center">
                    {contactLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.name}
                            className="relative flex flex-col items-center justify-center p-5 w-full max-w-[340px] h-[150px] rounded-[28px] border border-[#4F2B33]/30 dark:border-[#91B09A]/30 bg-gradient-to-br from-[#4F2B33]/[0.05] to-transparent dark:from-[#91B09A]/[0.05] dark:to-transparent backdrop-blur-xl shadow-sm active:scale-[0.98] transition-transform overflow-hidden group"
                        >
                            <div className="relative z-10 flex flex-col items-center justify-center gap-3 w-full h-full">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 text-[#4F2B33] dark:text-[#91B09A] transition-colors group-active:bg-[#4F2B33] group-active:text-[#D0C697] dark:group-active:bg-[#91B09A] dark:group-active:text-[#3B381E]">
                                    <div className="scale-[0.85]">{link.icon}</div>
                                </div>

                                <div className="flex flex-col items-center text-center w-full">
                                    <Text variant="title" as="h2" className="text-2xl font-bold text-[#4F2B33] dark:text-[#D0C697] leading-none">
                                        {link.name}
                                    </Text>
                                    <Text variant="text" as="span" className="text-[13px] font-bold text-[#4F2B33]/80 dark:text-[#91B09A]/90 tracking-wider text-center whitespace-nowrap mt-1.5">
                                        {link.value}
                                    </Text>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start px-6 pb-[360px] pt-4 w-full overflow-hidden">
            <div className="absolute top-10 z-0 w-56 h-56 md:w-[400px] md:h-[400px] bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative z-20 flex flex-col items-center gap-2 text-center w-full max-w-6xl mx-auto shrink-0">
                <Text variant="title" as="h1" className="text-5xl md:text-6xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                    {language === 'en' ? 'Contact' : 'Contato'}
                </Text>
                <div className="flex items-center gap-3 text-[#4F2B33]/80 dark:text-[#91B09A]/90 mt-2">
                    <div className="w-10 h-px bg-current opacity-40"></div>
                    <Text variant="text" as="p" className="text-xl">
                        {language === 'en' ? "So, let's talk?" : 'E aí, vamos conversar?'}
                    </Text>
                    <div className="w-10 h-px bg-current opacity-40"></div>
                </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
                <div className="relative w-full h-72 md:h-80 flex justify-center">
                    {contactLinks.map((link, index) => {
                        let wrapperClasses = "";
                        if (index === 0) wrapperClasses = "z-10 -translate-x-16 md:-translate-x-28 translate-y-6 md:translate-y-8 -rotate-[14deg]";
                        if (index === 1) wrapperClasses = "z-20";
                        if (index === 2) wrapperClasses = "z-10 translate-x-16 md:translate-x-28 translate-y-6 md:translate-y-8 rotate-[14deg]";

                        return (
                            <div
                                key={link.name}
                                className={`group absolute bottom-0 origin-bottom transition-all duration-300 ease-out hover:z-50 ${wrapperClasses}`}
                            >
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                    className="relative flex flex-col items-center justify-center py-10 px-4 w-48 h-72 md:w-56 md:h-80 rounded-2xl md:rounded-3xl border border-[#4F2B33]/30 dark:border-[#91B09A]/30 bg-gradient-to-br from-[#4F2B33]/[0.05] to-transparent dark:from-[#91B09A]/[0.05] dark:to-transparent backdrop-blur-xl shadow-[0_8px_30px_rgba(79,43,51,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out group-hover:-translate-y-12 md:group-hover:-translate-y-16 group-hover:shadow-[0_20px_40px_-10px_rgba(79,43,51,0.12)] dark:group-hover:shadow-[0_20px_40px_-10px_rgba(145,176,154,0.1)] overflow-hidden"
                                >
                                    <svg viewBox="0 0 224 320" className="absolute inset-0 w-full h-full hidden md:block text-[#4F2B33]/50 dark:text-[#91B09A]/40 pointer-events-none" aria-hidden="true">
                                        <rect x="10" y="10" width="204" height="300" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                        <rect x="28" y="28" width="168" height="264" rx="8" fill="none" stroke="currentColor" strokeWidth="1" />
                                        <path id={`desktop-path-${index}`} d="M 23,33 A 10,10 0 0 1 33,23 H 191 A 10,10 0 0 1 201,33 V 287 A 10,10 0 0 1 191,297 H 33 A 10,10 0 0 1 23,287 Z" fill="none" />

                                        <text fill="currentColor" fontSize="8" letterSpacing="4" className="opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                                            <textPath href={`#desktop-path-${index}`} startOffset="0%">{RUNES_REPEAT}</textPath>
                                        </text>
                                        <text fill="currentColor" fontSize="8" letterSpacing="4" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <textPath href={`#desktop-path-${index}`} startOffset="0%">
                                                {RUNES_REPEAT}
                                                <animate attributeName="startOffset" from="0%" to="-100%" dur="20s" repeatCount="indefinite" />
                                            </textPath>
                                        </text>
                                    </svg>

                                    <div className="relative z-10 flex flex-col items-center justify-center gap-6 w-full h-full px-2">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 text-[#4F2B33] dark:text-[#91B09A] transition-colors duration-300 group-hover:bg-[#4F2B33] group-hover:text-[#D0C697] dark:group-hover:bg-[#91B09A] dark:group-hover:text-[#3B381E]">
                                            {link.icon}
                                        </div>

                                        <div className="flex flex-col items-center gap-2 text-center w-full">
                                            <Text variant="title" as="h2" className="text-2xl md:text-3xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                                {link.name}
                                            </Text>
                                            <Text variant="text" as="span" className="text-[11px] md:text-xs font-medium text-[#4F2B33]/80 dark:text-[#91B09A]/90 tracking-wider text-center break-all w-full">
                                                {link.value}
                                            </Text>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
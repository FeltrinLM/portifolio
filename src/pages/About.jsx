import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Text } from '../components/Text';
import fotoPerfil from '../assets/good_looking.webp';

const RUNES = "ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛟ ᛞ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ";
const DOUBLE_RUNES = RUNES + " " + RUNES;

export function About({ language = 'br' }) {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const [scrollY, setScrollY] = useState(0);
    const [maxScroll, setMaxScroll] = useState(500);
    const [animateSkills, setAnimateSkills] = useState(false);

    useEffect(() => {
        const calculateScroll = () => setMaxScroll(window.innerHeight * 0.7);
        calculateScroll();

        const handleScroll = () => setScrollY(window.scrollY);

        window.addEventListener('resize', calculateScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', calculateScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

    useEffect(() => {
        if (progress > 0.4) {
            setAnimateSkills(true);
        } else {
            setAnimateSkills(false);
        }
    }, [progress]);

    const heroOpacity = Math.max(0, 1 - progress * 2);
    const heroScale = Math.max(0.8, 1 - progress * 0.4);

    const contentOpacity = Math.max(0, Math.min(1, (progress - 0.3) * 1.5));
    const contentTranslateY = 40 * (1 - progress);

    const languagesList = [
        { name: 'Java', highlight: true },
        { name: 'JavaScript', highlight: false },
        { name: 'TypeScript', highlight: false },
        { name: 'SQL', highlight: false }
    ];

    const frameworksList = [
        { name: 'Spring Boot', highlight: true },
        { name: 'Flutter', highlight: false },
        { name: 'Angular', highlight: false },
        { name: 'React', highlight: false }
    ];

    const toolsList = [
        { name: 'PostgreSQL', highlight: true },
        { name: 'Docker', highlight: false },
        { name: 'Git', highlight: false },
        { name: 'Mermaid', highlight: false },
        { name: 'Kanban', highlight: false }
    ];

    const renderSkillTag = (skill) => {
        const baseClass = "px-3 py-1.5 rounded-lg text-sm cursor-default transition-all duration-300 hover:scale-105 inline-block";
        const normalClass = "border border-[#4F2B33]/30 dark:border-[#91B09A]/40 text-[#4F2B33] dark:text-[#D0C697] hover:bg-[#4F2B33] hover:text-[#D0C697] dark:hover:bg-[#91B09A] dark:hover:text-[#3B381E]";
        const highlightClass = "bg-[#4F2B33] text-[#D0C697] dark:bg-[#91B09A] dark:text-[#3B381E] font-bold shadow-md";

        return (
            <span key={skill.name} className={`${baseClass} ${skill.highlight ? highlightClass : normalClass}`}>
                {skill.highlight ? `ᛜ ${skill.name}` : skill.name}
            </span>
        );
    };

    if (isMobile) {
        const cvUrl = language === 'en' ? '/cv/cv_lorenzo_en.pdf' : '/cv/cv_lorenzo_br.pdf';

        return (
            <div className="w-full flex flex-col px-6 pt-16 pb-32 gap-10 overflow-x-hidden">

                <div className="flex flex-col items-center text-center gap-4 relative">
                    <div className="absolute z-0 w-48 h-48 top-12 bg-[#4F2B33]/20 dark:bg-[#91B09A]/15 blur-[60px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 flex items-center justify-center w-64 h-64">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-90">
                            <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute animate-[spin_40s_linear_infinite] text-[#4F2B33]/60 dark:text-[#91B09A]/60">
                                <path id="outer-circle-mobile" d="M 150, 15 A 135,135 0 1,1 149.9,15" fill="none" />
                                <text fill="currentColor" fontSize="11" letterSpacing="6" fontWeight="bold">
                                    <textPath href="#outer-circle-mobile" startOffset="0%">
                                        {DOUBLE_RUNES}
                                    </textPath>
                                </text>
                            </svg>
                            <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute animate-[spin_30s_linear_infinite_reverse] text-[#4F2B33]/80 dark:text-[#91B09A]/80">
                                <path id="inner-circle-mobile" d="M 150, 32 A 118,118 0 1,1 149.9,32" fill="none" />
                                <text fill="currentColor" fontSize="9" letterSpacing="8" fontWeight="bold">
                                    <textPath href="#inner-circle-mobile" startOffset="0%">
                                        {RUNES}
                                    </textPath>
                                </text>
                            </svg>
                        </div>

                        <img
                            src={fotoPerfil}
                            alt="Lorenzo Feltrin"
                            className="relative z-10 w-40 h-40 rounded-full object-cover border-2 border-[#4F2B33] dark:border-[#91B09A] shadow-[0_0_30px_rgba(79,43,51,0.4)] dark:shadow-[0_0_30px_rgba(145,176,154,0.3)] bg-[#D0C697] dark:bg-[#3B381E]"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col gap-2 -mt-4">
                        <Text variant="title" as="h1" className="text-4xl font-bold text-[#4F2B33] dark:text-[#D0C697] tracking-wide">
                            Lorenzo Feltrin
                        </Text>
                        <Text variant="text" as="h2" className="text-[13px] text-[#4F2B33] dark:text-[#91B09A] tracking-[0.2em] uppercase font-bold">
                            {language === 'en' ? 'ᛉ Software Developer ᚨ' : 'ᛉ Desenvolvedor de Software ᚨ'}
                        </Text>
                    </div>

                    <a
                        href={cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 mt-2 px-8 py-3 rounded-full bg-[#4F2B33] dark:bg-[#91B09A] text-[#D0C697] dark:text-[#272516] font-bold tracking-widest uppercase text-[12px] shadow-[0_5px_15px_rgba(79,43,51,0.3)] dark:shadow-[0_5px_15px_rgba(145,176,154,0.2)] active:scale-95 transition-transform flex items-center gap-2"
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        {language === 'en' ? 'Download CV' : 'Baixar Currículo'}
                    </a>
                </div>

                <div className="flex flex-col gap-6 relative z-10 mt-4">
                    <Text variant="title" as="h2" className="text-3xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                        {language === 'en' ? 'Who I am.' : 'Quem eu sou.'}
                    </Text>
                    <div className="flex flex-col gap-4 text-[#4F2B33]/90 dark:text-[#D0C697]/90 text-base leading-relaxed font-medium">
                        <Text variant="text" as="p">
                            {language === 'en'
                                ? <>I consider <strong className="text-[#4F2B33] dark:text-[#D0C697] font-bold">Dr. House</strong> one of the best-written characters in TV history. My favorite episodes are... Wait, you're not here to read about that, right? Let's talk about what matters: I am an <strong className="text-[#4F2B33] dark:text-[#D0C697] font-bold">Internet Systems</strong> student at UFSM. If you haven't heard of it, you should. It's the most software-development-focused degree at the institution, and it's exactly where I fell in love with this world.</>
                                : <>Eu considero o <strong className="text-[#4F2B33] dark:text-[#D0C697] font-bold">Dr. House</strong> um dos personagens mais bem escritos da história da TV. Meus episódios preferidos são... Espera, você não está aqui para ler sobre isso, né? Bom... o que eu posso falar de útil aqui? Já sei! Sou estudante de <strong className="text-[#4F2B33] dark:text-[#D0C697] font-bold">Sistemas para Internet</strong> na UFSM. Se você nunca ouviu falar do curso, deveria: é a graduação mais focada em desenvolvimento de software da instituição, e foi lá que eu me apaixonei por esse mundo.</>}
                        </Text>
                        <Text variant="text" as="p">
                            {language === 'en'
                                ? "What you are seeing on this site isn't the product of a few days working with React. It's the result of years learning the core concepts of programming, refining my understanding of UI/UX, and, most importantly, realizing how crucial it is to put a little 'soul' into our creations."
                                : "O que vocês estão vendo neste site não é o produto de alguns dias de trabalho em React. É o resultado de anos aprendendo sobre os conceitos básicos de programação, fundamentos de UI/UX e, principalmente, entendendo o quão importante é colocar alma em nossas criações."}
                        </Text>
                    </div>
                </div>

                <div className="flex flex-col gap-3 relative z-10">
                    {[
                        {
                            label: language === 'en' ? 'AREA' : 'ÁREA',
                            value: language === 'en' ? 'Computer Science' : 'Ciência da Computação',
                            icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'
                        },
                        {
                            label: language === 'en' ? 'FOCUS' : 'FOCO',
                            value: language === 'en' ? 'Software Engineering' : 'Engenharia de Software',
                            icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                        }
                    ].map((card, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-[#4F2B33]/20 dark:border-[#91B09A]/20 bg-[#4F2B33]/5 dark:bg-[#91B09A]/5">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 text-[#4F2B33] dark:text-[#91B09A] shrink-0">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d={card.icon} />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <Text variant="text" className="text-[10px] font-bold tracking-widest opacity-60 uppercase text-[#4F2B33] dark:text-[#D0C697]">{card.label}</Text>
                                <Text variant="text" className="text-sm font-bold text-[#4F2B33] dark:text-[#D0C697]">{card.value}</Text>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 rounded-3xl border border-[#4F2B33]/20 dark:border-[#91B09A]/20 bg-[#4F2B33]/[0.03] dark:bg-[#91B09A]/[0.03] shadow-lg flex flex-col gap-8 relative z-10">
                    <Text variant="title" as="h3" className="text-2xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                        {language === 'en' ? 'Technical Skills' : 'Habilidades Técnicas'}
                    </Text>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Text variant="text" className="text-[11px] font-bold tracking-widest opacity-60 uppercase text-[#4F2B33] dark:text-[#D0C697]">
                                {language === 'en' ? 'Languages' : 'Linguagens'}
                            </Text>
                            <div className="flex flex-wrap gap-2">
                                {languagesList.map(renderSkillTag)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Text variant="text" className="text-[11px] font-bold tracking-widest opacity-60 uppercase text-[#4F2B33] dark:text-[#D0C697]">
                                Frameworks
                            </Text>
                            <div className="flex flex-wrap gap-2">
                                {frameworksList.map(renderSkillTag)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Text variant="text" className="text-[11px] font-bold tracking-widest opacity-60 uppercase text-[#4F2B33] dark:text-[#D0C697]">
                                {language === 'en' ? 'Tools' : 'Ferramentas'}
                            </Text>
                            <div className="flex flex-wrap gap-2">
                                {toolsList.map(renderSkillTag)}
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-[#4F2B33]/10 dark:bg-[#91B09A]/10"></div>

                    <Text variant="title" as="h3" className="text-xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                        {language === 'en' ? 'Languages' : 'Idiomas'}
                    </Text>

                    <div className="flex flex-row justify-around mt-2">
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative flex items-center justify-center w-16 h-16">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-[#4F2B33]/10 dark:stroke-[#91B09A]/20" />
                                    <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-[#4F2B33] dark:stroke-[#91B09A]" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="0" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Text variant="text" className="text-[9px] font-bold text-[#4F2B33] dark:text-[#D0C697] uppercase tracking-widest">
                                        {language === 'en' ? 'Native' : 'Nativo'}
                                    </Text>
                                </div>
                            </div>
                            <Text variant="title" className="text-lg font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                {language === 'en' ? 'Portuguese' : 'Português'}
                            </Text>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="relative flex items-center justify-center w-16 h-16">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-[#4F2B33]/10 dark:stroke-[#91B09A]/20" />
                                    <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-[#4F2B33] dark:stroke-[#91B09A]" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="25.12" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center mt-1">
                                    <Text variant="title" className="text-lg font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                        C1
                                    </Text>
                                </div>
                            </div>
                            <Text variant="title" className="text-lg font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                {language === 'en' ? 'English' : 'Inglês'}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[170vh]">

            <div
                className="fixed inset-0 w-full flex flex-col items-center justify-start pt-[12vh] pointer-events-none"
                style={{
                    transform: `scale(${heroScale})`,
                    opacity: heroOpacity,
                    willChange: 'transform, opacity'
                }}
            >
                <div className="absolute z-0 w-64 h-64 md:w-96 md:h-96 top-[20vh] bg-[#4F2B33]/20 dark:bg-[#91B09A]/15 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative w-full max-w-5xl flex items-center justify-center mb-8 pointer-events-auto">

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

                <div className="flex flex-col items-center gap-4 text-center z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] pointer-events-auto">
                    <Text variant="title" as="h1" className="text-5xl md:text-7xl font-bold text-[#4F2B33] dark:text-[#D0C697] tracking-wide">
                        Lorenzo Feltrin
                    </Text>
                    <Text variant="text" as="h2" className="text-lg md:text-xl text-[#4F2B33] dark:text-[#91B09A] tracking-[0.3em] uppercase font-bold">
                        {language === 'en' ? 'ᛉ Software Developer ᚨ' : 'ᛉ Desenvolvedor de Software ᚨ'}
                    </Text>
                </div>
            </div>

            <div
                className="fixed inset-0 w-full h-screen px-6 pt-32 pb-[240px] flex items-center justify-center pointer-events-none"
                style={{
                    opacity: contentOpacity,
                    transform: `translateY(${contentTranslateY}px)`,
                    willChange: 'transform, opacity'
                }}
            >
                <div className="relative z-20 w-full max-w-6xl mx-auto pointer-events-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">

                        <div className="lg:col-span-7 flex flex-col gap-8">

                            <div className="flex flex-col gap-2">
                                <Text variant="title" as="h2" className="text-4xl md:text-5xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                    {language === 'en' ? 'Who I am.' : 'Quem eu sou.'}
                                </Text>
                            </div>

                            <div className="flex flex-col gap-6 text-[#4F2B33]/90 dark:text-[#D0C697]/90 text-lg leading-relaxed font-medium">
                                <Text variant="text" as="p">
                                    {language === 'en'
                                        ? <>I consider <strong className="text-[#4F2B33] dark:text-[#D0C697] font-bold">Dr. House</strong> one of the best-written characters in TV history. My favorite episodes are... Wait, you're not here to read about that, right? Let's talk about what matters: I am an <strong className="text-[#4F2B33] dark:text-[#D0C697] font-bold">Internet Systems</strong> student at UFSM. If you haven't heard of it, you should. It's the most software-development-focused degree at the institution, and it's exactly where I fell in love with this world.</>
                                        : <>Eu considero o <strong className="text-[#4F2B33] dark:text-[#D0C697] font-bold">Dr. House</strong> um dos personagens mais bem escritos da história da TV. Meus episódios preferidos são... Espera, você não está aqui para ler sobre isso, né? Bom... o que eu posso falar de útil aqui? Já sei! Sou estudante de <strong className="text-[#4F2B33] dark:text-[#D0C697] font-bold">Sistemas para Internet</strong> na UFSM. Se você nunca ouviu falar do curso, deveria: é a graduação mais focada em desenvolvimento de software da instituição, e foi lá que eu me apaixonei por esse mundo.</>}
                                </Text>
                                <Text variant="text" as="p">
                                    {language === 'en'
                                        ? "What you are seeing on this site isn't the product of a few days working with React. It's the result of years learning the core concepts of programming, refining my understanding of UI/UX, and, most importantly, realizing how crucial it is to put a little 'soul' into our creations."
                                        : "O que vocês estão vendo neste site não é o produto de alguns dias de trabalho em React. É o resultado de anos aprendendo sobre os conceitos básicos de programação, fundamentos de UI/UX e, principalmente, entendendo o quão importante é colocar alma em nossas criações."}
                                </Text>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                {[
                                    {
                                        label: language === 'en' ? 'AREA' : 'ÁREA',
                                        value: language === 'en' ? 'Computer Science' : 'Ciência da Computação',
                                        icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'
                                    },
                                    {
                                        label: language === 'en' ? 'FOCUS' : 'FOCO',
                                        value: language === 'en' ? 'Software Engineering' : 'Engenharia de Software',
                                        icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                                    }
                                ].map((card, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-[#4F2B33]/20 dark:border-[#91B09A]/20 bg-[#4F2B33]/5 dark:bg-[#91B09A]/5 backdrop-blur-sm">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 text-[#4F2B33] dark:text-[#91B09A] shrink-0">
                                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <path d={card.icon} />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <Text variant="text" className="text-[10px] font-bold tracking-widest opacity-60 uppercase text-[#4F2B33] dark:text-[#D0C697]">{card.label}</Text>
                                            <Text variant="text" className="text-sm font-bold text-[#4F2B33] dark:text-[#D0C697]">{card.value}</Text>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="w-full h-full p-6 md:p-8 rounded-3xl border border-[#4F2B33]/20 dark:border-[#91B09A]/20 bg-[#4F2B33]/[0.02] dark:bg-[#91B09A]/[0.02] backdrop-blur-md flex flex-col justify-between gap-8 shadow-lg">

                                <div className="flex flex-col gap-8">
                                    <Text variant="title" as="h3" className="text-2xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                        {language === 'en' ? 'Technical Skills' : 'Habilidades Técnicas'}
                                    </Text>

                                    <div className="flex flex-col gap-6">

                                        <div className="flex flex-col gap-3">
                                            <Text variant="text" className="text-[11px] font-bold tracking-widest opacity-60 uppercase text-[#4F2B33] dark:text-[#D0C697]">
                                                {language === 'en' ? 'Languages' : 'Linguagens'}
                                            </Text>
                                            <div className="flex flex-wrap gap-2">
                                                {languagesList.map(renderSkillTag)}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <Text variant="text" className="text-[11px] font-bold tracking-widest opacity-60 uppercase text-[#4F2B33] dark:text-[#D0C697]">
                                                Frameworks
                                            </Text>
                                            <div className="flex flex-wrap gap-2">
                                                {frameworksList.map(renderSkillTag)}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <Text variant="text" className="text-[11px] font-bold tracking-widest opacity-60 uppercase text-[#4F2B33] dark:text-[#D0C697]">
                                                {language === 'en' ? 'Tools' : 'Ferramentas'}
                                            </Text>
                                            <div className="flex flex-wrap gap-2">
                                                {toolsList.map(renderSkillTag)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="w-full h-px bg-[#4F2B33]/10 dark:bg-[#91B09A]/10"></div>
                                    <Text variant="title" as="h3" className="text-xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                        {language === 'en' ? 'Languages' : 'Idiomas'}
                                    </Text>

                                    <div className="flex flex-row justify-around mt-2">

                                        <div className="flex flex-col items-center gap-3">
                                            <div className="relative flex items-center justify-center w-20 h-20">
                                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-[#4F2B33]/10 dark:stroke-[#91B09A]/20" />
                                                    <circle
                                                        cx="50" cy="50" r="40" fill="none" strokeWidth="8"
                                                        className="stroke-[#4F2B33] dark:stroke-[#91B09A]"
                                                        strokeLinecap="round"
                                                        strokeDasharray="251.2"
                                                        strokeDashoffset={animateSkills ? 0 : 251.2}
                                                        style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Text variant="text" className="text-[10px] font-bold text-[#4F2B33] dark:text-[#D0C697] uppercase tracking-widest">
                                                        {language === 'en' ? 'Native' : 'Nativo'}
                                                    </Text>
                                                </div>
                                            </div>
                                            <Text variant="title" className="text-xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                                {language === 'en' ? 'Portuguese' : 'Português'}
                                            </Text>
                                        </div>

                                        <div className="flex flex-col items-center gap-3">
                                            <div className="relative flex items-center justify-center w-20 h-20">
                                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-[#4F2B33]/10 dark:stroke-[#91B09A]/20" />
                                                    <circle
                                                        cx="50" cy="50" r="40" fill="none" strokeWidth="8"
                                                        className="stroke-[#4F2B33] dark:stroke-[#91B09A]"
                                                        strokeLinecap="round"
                                                        strokeDasharray="251.2"
                                                        strokeDashoffset={animateSkills ? 25.12 : 251.2}
                                                        style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center mt-1">
                                                    <Text variant="title" className="text-xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                                        C1
                                                    </Text>
                                                </div>
                                            </div>
                                            <Text variant="title" className="text-xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                                {language === 'en' ? 'English' : 'Inglês'}
                                            </Text>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
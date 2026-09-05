import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { Text } from '../components/Text';

const LocationIcon = () => <svg aria-hidden="true" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const BriefcaseIcon = () => <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>;
const ProfileIcon = () => <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;

const experiences = [
    {
        roleBr: 'Engenheiro de Software e Gerente de Projetos', roleEn: 'Software Engineer & Project Manager',
        company: 'CompactJR', dateBr: 'Abril 2025 – Junho 2026', dateEn: 'April 2025 – June 2026',
        locationBr: 'Santa Maria, RS', locationEn: 'Santa Maria, Brazil',
        descriptionBr: 'Liderei a gestão e o desenvolvimento Full-Stack de um sistema ERP para Empresas Juniores, unificando o controle de alocação de equipes em React (TypeScript) e Node.js. Estruturei o versionamento colaborativo com Git, orquestrei deploy corporativo com Docker e gerenciei end-to-end o novo site institucional, garantindo alinhamento estratégico com stakeholders e aumento significativo do tráfego orgânico. Fui pioneiro na introdução de práticas ágeis (GitHub Kanban/Lucidchart).',
        descriptionEn: 'Led management and Full-Stack development of a Junior Companies ERP system, unifying team allocation using React (TypeScript) and Node.js. Structured collaborative versioning with Git, orchestrated corporate deploy using Docker, and managed the new institutional website end-to-end, ensuring strategic alignment with stakeholders and a significant increase in organic traffic. Pioneered the introduction of Agile practices (GitHub Kanban/Lucidchart).',
        tags: ['React', 'TypeScript', 'Node.js', 'ERP', 'Git', 'Docker', 'Metodologias Ágeis'], icon: <BriefcaseIcon/>
    },
    {
        roleBr: 'Vendedor', roleEn: 'Salesperson',
        company: 'World Tennis', dateBr: 'Fevereiro 2024 – Maio 2024', dateEn: 'February 2024 – May 2024',
        locationBr: 'Santa Maria, RS', locationEn: 'Santa Maria, Brazil',
        descriptionBr: 'Atendimento direto ao público, com foco no desenvolvimento de habilidades interpessoais, comunicação eficaz e rápida resolução de necessidades dos clientes em um ambiente dinâmico.',
        descriptionEn: 'Direct customer service, focusing on the development of interpersonal skills, effective communication, and rapid resolution of customer needs in a dynamic environment.',
        tags: ['Vendas', 'Comunicação Eficaz', 'Habilidades Interpessoais'], icon: <ProfileIcon/>
    }
];

const cardVariants = {
    active: { x: 0, y: 0, opacity: 1, zIndex: 10 },
    future: (diff) => ({ x: diff * 20, y: -(diff * 20), opacity: 1, zIndex: 10 - diff }),
    past: { x: -200, y: 50, opacity: 0, zIndex: 0 }
};

export function Experience({ language = 'br' }) {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [expandedIndex, setExpandedIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const isScrolling = useRef(false);
    const scrollTimeoutRef = useRef(null);

    useEffect(() => {
        const handleWheel = (e) => {
            if (isScrolling.current) return;

            const newIndex = activeIndex + Math.sign(e.deltaY);

            if (newIndex >= 0 && newIndex < experiences.length) {
                isScrolling.current = true;
                setActiveIndex(newIndex);
                scrollTimeoutRef.current = setTimeout(() => (isScrolling.current = false), 350);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [activeIndex]);

    function handleAccordionKeyDown(e, index) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpandedIndex(expandedIndex === index ? null : index);
        }
    }

    if (isMobile) {
        return (
            <div className="w-full min-h-screen flex flex-col pt-12 pb-28 px-4 overflow-x-hidden">
                <div className="relative z-20 flex flex-col items-center gap-1 text-center w-full mb-8 mt-4">
                    <Text variant="title" as="h1" className="text-4xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                        {language === 'en' ? 'My Experience' : 'Minha Experiência'}
                    </Text>
                    <div className="flex items-center gap-3 text-[#4F2B33]/80 dark:text-[#91B09A]/90 mt-1">
                        <div className="w-6 h-px bg-current opacity-40"></div>
                        <Text variant="text" as="p" className="text-base tracking-widest">
                            {language === 'en' ? 'The Journey So Far' : 'A Jornada Até Aqui'}
                        </Text>
                        <div className="w-6 h-px bg-current opacity-40"></div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    {experiences.map((exp, index) => {
                        const isExpanded = expandedIndex === index;

                        return (
                            <div
                                key={exp.company}
                                role="button"
                                tabIndex={0}
                                aria-expanded={isExpanded}
                                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                onKeyDown={(e) => handleAccordionKeyDown(e, index)}
                                className={`w-full rounded-[24px] border transition-all duration-300 ease-in-out relative overflow-hidden flex flex-col p-5 cursor-pointer
                                    ${isExpanded
                                    ? 'shadow-md border-[#4F2B33]/30 dark:border-[#91B09A]/40 bg-[#4F2B33]/[0.04] dark:bg-[#91B09A]/[0.04]'
                                    : 'shadow-sm border-[#4F2B33]/20 dark:border-[#91B09A]/20 bg-[#4F2B33]/[0.02] dark:bg-[#91B09A]/[0.02] hover:bg-[#4F2B33]/[0.04] dark:hover:bg-[#91B09A]/[0.04]'
                                }`}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-4 pr-2">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 text-[#4F2B33] dark:text-[#91B09A] shrink-0">
                                            {exp.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <Text variant="title" as="h2" className="text-xl font-bold text-[#4F2B33] dark:text-[#D0C697] leading-tight">
                                                {language === 'en' ? exp.roleEn : exp.roleBr}
                                            </Text>
                                            <Text variant="text" as="span" className="text-[13px] font-bold opacity-70 mt-1 uppercase tracking-widest text-[#4F2B33] dark:text-[#D0C697]">
                                                {exp.company}
                                            </Text>
                                        </div>
                                    </div>

                                    <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="shrink-0 text-[#4F2B33] dark:text-[#91B09A]"
                                    >
                                        <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </motion.div>
                                </div>

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-5 pb-1 flex flex-col gap-4 border-t border-[#4F2B33]/10 dark:border-[#91B09A]/10 mt-4">

                                                <div className="flex flex-col gap-2 text-xs font-medium text-[#4F2B33]/80 dark:text-[#91B09A]/90">
                                                    <div className="flex items-center gap-1.5 opacity-80">
                                                        <LocationIcon />
                                                        <span>{language === 'en' ? exp.locationEn : exp.locationBr}</span>
                                                    </div>
                                                    <div className="self-start bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 px-3 py-1.5 rounded-full uppercase tracking-wider text-[#4F2B33] dark:text-[#D0C697] font-bold text-[10px]">
                                                        {language === 'en' ? exp.dateEn : exp.dateBr}
                                                    </div>
                                                </div>

                                                <Text variant="text" as="p" className="text-[13px] text-[#4F2B33]/90 dark:text-[#91B09A]/90 leading-relaxed">
                                                    {language === 'en' ? exp.descriptionEn : exp.descriptionBr}
                                                </Text>

                                                <div className="flex flex-wrap gap-1.5 mt-1">
                                                    {exp.tags.map((tag) => (
                                                        <div key={tag} className="px-3 py-1 rounded bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 text-[#4F2B33] dark:text-[#91B09A] text-[10px] font-bold tracking-wider uppercase">
                                                            {tag}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 pt-8 md:pt-12 pb-6 px-6 bg-[#D0C697] dark:bg-[#272516] overflow-hidden flex flex-col items-center justify-start">
            <div className="absolute z-0 w-[600px] h-[600px] top-10 -right-20 bg-[#4F2B33]/5 dark:bg-[#91B09A]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-20 flex flex-col items-center gap-2 text-center w-full max-w-6xl mx-auto px-6 shrink-0">
                <Text variant="title" as="h1" className="text-5xl md:text-6xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                    {language === 'en' ? 'My Experience' : 'Minha Experiência'}
                </Text>
                <div className="flex items-center gap-3 text-[#4F2B33]/80 dark:text-[#91B09A]/90">
                    <div className="w-10 h-px bg-current opacity-40" />
                    <Text variant="text" as="p" className="text-xl tracking-widest">
                        {language === 'en' ? 'The Journey So Far' : 'A Jornada Até Aqui'}
                    </Text>
                    <div className="w-10 h-px bg-current opacity-40" />
                </div>
            </div>

            <div className="relative w-full max-w-4xl h-[500px] md:h-[400px] mt-14 md:mt-16 shrink-0">
                <div className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
                    {experiences.map((exp, i) => (
                        <div key={`dot-${exp.company}`} className={`rounded-full transition-all duration-300 ${activeIndex === i ? 'w-2 h-6 bg-[#4F2B33] dark:bg-[#91B09A]' : 'w-2 h-2 bg-[#4F2B33]/30 dark:bg-[#91B09A]/30'}`} />
                    ))}
                </div>

                {experiences.map((exp, index) => {
                    const diff = index - activeIndex;
                    const state = diff === 0 ? 'active' : diff > 0 ? 'future' : 'past';

                    return (
                        <motion.div
                            key={exp.company}
                            custom={diff}
                            variants={cardVariants}
                            initial="future"
                            animate={state}
                            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                            style={{ transformStyle: 'preserve-3d', WebkitFontSmoothing: 'antialiased' }}
                            className="absolute top-0 left-0 right-0 w-full rounded-2xl border border-[#4F2B33]/20 dark:border-[#91B09A]/30 bg-[#D0C697] dark:bg-[#272516] p-6 md:p-8 shadow-xl"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 w-full">
                                <div className="flex flex-col">
                                    <Text variant="title" as="h2" className="text-2xl md:text-3xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                        {language === 'en' ? exp.roleEn : exp.roleBr}
                                    </Text>
                                    <div className="flex flex-wrap items-center gap-2 font-bold text-lg text-[#4F2B33]/90 dark:text-[#91B09A] mt-1">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#D0C697] dark:bg-[#272516] border border-[#4F2B33]/20 dark:border-[#91B09A]/20 shadow-inner">
                                            {exp.icon}
                                        </div>
                                        <span>{exp.company}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 md:items-end text-sm text-[#4F2B33]/70 dark:text-[#91B09A]/80">
                                    <div className="font-medium tracking-wide uppercase px-3 py-1 rounded-full bg-[#4F2B33]/5 dark:bg-[#91B09A]/5 text-[#4F2B33] dark:text-[#D0C697]">
                                        {language === 'en' ? exp.dateEn : exp.dateBr}
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-80 mt-1 md:mt-2">
                                        <LocationIcon />
                                        <span>{language === 'en' ? exp.locationEn : exp.locationBr}</span>
                                    </div>
                                </div>
                            </div>

                            <Text variant="text" as="p" className="text-[#4F2B33]/90 dark:text-[#91B09A]/95 mt-5 leading-relaxed">
                                {language === 'en' ? exp.descriptionEn : exp.descriptionBr}
                            </Text>

                            <div className="flex flex-wrap gap-2 pt-5 mt-4 border-t border-[#4F2B33]/10 dark:border-[#91B09A]/10">
                                {exp.tags.map((tag) => (
                                    <div key={tag} className="px-4 py-1.5 rounded-md bg-[#4F2B33] dark:bg-[#91B09A] text-[#D0C697] dark:text-[#272516] text-xs font-bold tracking-wider shadow-sm">{tag}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
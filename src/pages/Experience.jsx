import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { Text } from '../components/Text';

const LocationIcon = () => <svg aria-hidden="true" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const BriefcaseIcon = () => <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>;
const ProfileIcon = () => <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const ChevronLeft = () => <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ChevronRight = () => <svg aria-hidden="true" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

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

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 400 : -400,
        opacity: 0,
        scale: 0.95
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 400 : -400,
        opacity: 0,
        scale: 0.95
    })
};

export function Experience({ language = 'br' }) {
    // Restaurando o mobile!
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [expandedIndex, setExpandedIndex] = useState(0);

    // Estados do Desktop (Slider Horizontal)
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection) => {
        const newPage = page + newDirection;
        if (newPage >= 0 && newPage < experiences.length) {
            setPage([newPage, newDirection]);
        }
    };

    const goToPage = (i) => {
        setPage([i, i > page ? 1 : -1]);
    };

    const exp = experiences[page];
    const isFirstPage = page === 0;
    const isLastPage = page === experiences.length - 1;

    function handleAccordionKeyDown(e, index) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpandedIndex(expandedIndex === index ? null : index);
        }
    }

    // --- A RENDERIZAÇÃO MOBILE FICA INTACTA ---
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
                    {experiences.map((mobileExp, index) => {
                        const isExpanded = expandedIndex === index;

                        return (
                            <div
                                key={mobileExp.company}
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
                                            {mobileExp.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <Text variant="title" as="h2" className="text-xl font-bold text-[#4F2B33] dark:text-[#D0C697] leading-tight">
                                                {language === 'en' ? mobileExp.roleEn : mobileExp.roleBr}
                                            </Text>
                                            <Text variant="text" as="span" className="text-[13px] font-bold opacity-70 mt-1 uppercase tracking-widest text-[#4F2B33] dark:text-[#D0C697]">
                                                {mobileExp.company}
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
                                                        <span>{language === 'en' ? mobileExp.locationEn : mobileExp.locationBr}</span>
                                                    </div>
                                                    <div className="self-start bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 px-3 py-1.5 rounded-full uppercase tracking-wider text-[#4F2B33] dark:text-[#D0C697] font-bold text-[10px]">
                                                        {language === 'en' ? mobileExp.dateEn : mobileExp.dateBr}
                                                    </div>
                                                </div>

                                                <Text variant="text" as="p" className="text-[13px] text-[#4F2B33]/90 dark:text-[#91B09A]/90 leading-relaxed">
                                                    {language === 'en' ? mobileExp.descriptionEn : mobileExp.descriptionBr}
                                                </Text>

                                                <div className="flex flex-wrap gap-1.5 mt-1">
                                                    {mobileExp.tags.map((tag) => (
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

    // --- RENDERIZAÇÃO DESKTOP ---
    return (
        <div className="fixed inset-0 pt-8 md:pt-12 pb-6 px-6 bg-[#D0C697] dark:bg-[#272516] overflow-hidden flex flex-col items-center justify-start">
            <div className="absolute z-0 w-[600px] h-[600px] top-10 -right-20 bg-[#4F2B33]/5 dark:bg-[#91B09A]/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Título e Subtítulo Exatamente como antes */}
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

            {/* Container do Slider - Aumentado horizontalmente e verticalmente (345px) */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl mt-12 shrink-0">

                {/* Botões de Navegação */}
                <button
                    onClick={() => paginate(-1)}
                    disabled={isFirstPage}
                    aria-label={language === 'en' ? 'Previous' : 'Anterior'}
                    className={`absolute -left-2 lg:-left-12 z-30 p-3 rounded-full border transition-all active:scale-95 ${
                        isFirstPage
                            ? 'opacity-30 cursor-not-allowed border-transparent text-[#4F2B33]/50 dark:text-[#91B09A]/50'
                            : 'border-[#4F2B33]/30 dark:border-[#91B09A]/30 bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 hover:bg-[#4F2B33] hover:text-[#D0C697] dark:hover:bg-[#91B09A] dark:hover:text-[#272516] text-[#4F2B33] dark:text-[#91B09A] shadow-md'
                    }`}
                >
                    <ChevronLeft />
                </button>

                {/* Container do Card Horizontal */}
                <div className="relative w-full max-w-4xl h-[345px] flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute w-full h-full rounded-[32px] border border-[#4F2B33]/20 dark:border-[#91B09A]/30 bg-[#D0C697] dark:bg-[#272516] p-8 shadow-xl flex flex-col gap-4"
                        >
                            {/* Cabeçalho do Card */}
                            <div className="flex justify-between items-start gap-4 w-full shrink-0">
                                <div className="flex flex-col">
                                    <Text variant="title" as="h2" className="text-3xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                                        {language === 'en' ? exp.roleEn : exp.roleBr}
                                    </Text>
                                    <div className="flex items-center gap-2 font-bold text-lg text-[#4F2B33]/90 dark:text-[#91B09A] mt-2">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#D0C697] dark:bg-[#272516] border border-[#4F2B33]/20 dark:border-[#91B09A]/20 shadow-inner">
                                            {exp.icon}
                                        </div>
                                        <span>{exp.company}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 text-sm text-[#4F2B33]/70 dark:text-[#91B09A]/80 shrink-0">
                                    <div className="font-medium tracking-wide uppercase px-3 py-1 rounded-full bg-[#4F2B33]/5 dark:bg-[#91B09A]/5 text-[#4F2B33] dark:text-[#D0C697]">
                                        {language === 'en' ? exp.dateEn : exp.dateBr}
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-80 mt-2">
                                        <LocationIcon />
                                        <span>{language === 'en' ? exp.locationEn : exp.locationBr}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 my-2 shrink-0"></div>

                            {/* Duas Colunas: Competências (Esquerda) e Descrição (Direita) */}
                            <div className="flex flex-row gap-8 w-full h-full">

                                <div className="w-[35%] flex flex-col gap-3 shrink-0 border-r border-[#4F2B33]/10 dark:border-[#91B09A]/10 pr-6">
                                    <Text variant="title" className="text-sm font-bold uppercase tracking-widest text-[#4F2B33]/70 dark:text-[#91B09A]/70">
                                        {language === 'en' ? 'Skills' : 'Competências'}
                                    </Text>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tags.map((tag) => (
                                            <div key={tag} className="px-3 py-1.5 rounded-md bg-[#4F2B33] dark:bg-[#91B09A] text-[#D0C697] dark:text-[#272516] text-[11px] font-bold tracking-wider uppercase shadow-sm">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-[65%]">
                                    <Text variant="text" as="p" className="text-[14.5px] text-[#4F2B33]/90 dark:text-[#91B09A]/95 leading-relaxed">
                                        {language === 'en' ? exp.descriptionEn : exp.descriptionBr}
                                    </Text>
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

                <button
                    onClick={() => paginate(1)}
                    disabled={isLastPage}
                    aria-label={language === 'en' ? 'Next' : 'Próximo'}
                    className={`absolute -right-2 lg:-right-12 z-30 p-3 rounded-full border transition-all active:scale-95 ${
                        isLastPage
                            ? 'opacity-30 cursor-not-allowed border-transparent text-[#4F2B33]/50 dark:text-[#91B09A]/50'
                            : 'border-[#4F2B33]/30 dark:border-[#91B09A]/30 bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 hover:bg-[#4F2B33] hover:text-[#D0C697] dark:hover:bg-[#91B09A] dark:hover:text-[#272516] text-[#4F2B33] dark:text-[#91B09A] shadow-md'
                    }`}
                >
                    <ChevronRight />
                </button>
            </div>

            {/* Indicadores de Paginação */}
            <div className="relative z-20 flex items-center gap-3 mt-8">
                {experiences.map((_, i) => (
                    <button
                        key={`dot-${i}`}
                        onClick={() => goToPage(i)}
                        aria-label={language === 'en' ? `Go to experience ${i + 1}` : `Ir para experiência ${i + 1}`}
                        className={`rounded-full transition-all duration-300 active:scale-90 ${
                            page === i
                                ? 'w-8 h-2.5 bg-[#4F2B33] dark:bg-[#91B09A] shadow-md'
                                : 'w-2.5 h-2.5 bg-[#4F2B33]/30 dark:bg-[#91B09A]/30 hover:bg-[#4F2B33]/60 dark:hover:bg-[#91B09A]/60'
                        }`}
                    />
                ))}
            </div>

        </div>
    );
}
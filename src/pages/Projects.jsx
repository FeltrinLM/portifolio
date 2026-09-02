import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'; // <-- 1. Importe o hook
import { Text } from '../components/Text';

const SparkleIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
    </svg>
);

const GitHubIcon = () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
    </svg>
);

const projects = [
    {
        title: 'Journey',
        subtitleBr: 'Ecossistema de Gestão de Estoque',
        subtitleEn: 'Inventory Management Ecosystem',
        descriptionBr: 'Sistema desenvolvido de ponta a ponta para otimizar o fluxo de vendas e inventário da marca de roupas Journey. A arquitetura foi projetada para que a API central sirva dados em tempo real e de forma simultânea para dois clientes distintos: uma interface Web administrativa e um aplicativo Mobile.',
        descriptionEn: 'End-to-end system developed to optimize the sales and inventory flow for the Journey clothing brand. The architecture was designed so the central API serves real-time data simultaneously to two distinct clients: an administrative Web interface and a Mobile app.',
        tags: ['Java (Spring)', 'Angular', 'Flutter', 'Mermaid'],
        featured: false,
        links: [
            { label: 'Backend', url: 'https://github.com/FeltrinLM/Journey_Back-end' },
            { label: 'Frontend', url: 'https://github.com/FeltrinLM/JourneyFront-end' },
            { label: 'Mobile', url: 'https://github.com/FeltrinLM/journey_mobile' }
        ]
    },
    {
        title: 'LENPA',
        subtitleBr: 'Plataforma de Gestão de Eventos',
        subtitleEn: 'Event Management Platform',
        descriptionBr: 'Sistema criado para gerenciar e promover os eventos, exposições e workshops oferecidos ao público pelo laboratório LENPA da Universidade Federal de Santa Maria (UFSM). Toda a infraestrutura do projeto foi isolada e orquestrada utilizando Docker.',
        descriptionEn: 'System created to manage and promote events, exhibitions, and workshops offered to the public by the LENPA laboratory at the Federal University of Santa Maria (UFSM). The entire project infrastructure was isolated and orchestrated using Docker.',
        tags: ['Java (Spring)', 'PostgreSQL', 'Angular', 'Docker'],
        featured: true,
        links: [
            { label: 'Backend', url: 'https://github.com/FeltrinLM/LENPA_backend' },
            { label: 'Frontend', url: 'https://github.com/FeltrinLM/LENPA-frontend' }
        ]
    },
    {
        title: 'Gestão de Salas',
        subtitleBr: 'Central de Agendamentos Institucionais',
        subtitleEn: 'Institutional Scheduling Center',
        descriptionBr: 'Sistema de gerenciamento de agendamentos de salas para o Colégio Politécnico da UFSM. Desenvolvido em equipe empregando metodologias ágeis, testes unitários e GitHub Kanban para padronizar as requisições de espaço da instituição. (Nota: Repositório mantido privado por questões de propriedade intelectual).',
        descriptionEn: 'Room scheduling management system for the UFSM Polytechnic College. Developed in a team employing agile methodologies, unit testing, and GitHub Kanban to standardize the institution’s space requests. (Note: Repository kept private due to intellectual property reasons).',
        tags: ['Python (Django)', 'MongoDB', 'HTML/CSS/JS', 'Testes Unitários'],
        featured: false,
        links: []
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export function Projects({ language = 'br' }) {
    // 2. Hook de detecção
    const isMobile = useMediaQuery({ maxWidth: 768 });

    // ----------------------------------------------------------------------
    // 3. A INTERCEPTAÇÃO MOBILE (SEU ESPAÇO EM BRANCO)
    // ----------------------------------------------------------------------
    if (isMobile) {
        return (
            <div className="w-full flex flex-col pt-10 px-4">
                <Text variant="title" as="h1" className="text-3xl font-bold text-[#4F2B33] dark:text-[#D0C697] text-center">
                    {language === 'en' ? 'Projects (Mobile)' : 'Projetos (Versão Celular)'}
                </Text>

                <Text variant="text" as="p" className="text-[#4F2B33] dark:text-[#91B09A] mt-4 text-center">
                    Espaço reservado. Assim como na experiência, você poderá exibir os cards
                    empilhados com scroll natural ou até um carrossel "swipe" horizontal!
                </Text>

                <div className="mt-8 flex flex-col gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="p-4 border border-[#4F2B33]/30 dark:border-[#91B09A]/30 rounded-xl relative">
                            {project.featured && (
                                <span className="absolute -top-3 left-4 bg-[#4F2B33] dark:bg-[#91B09A] text-[#D0C697] dark:text-[#272516] px-3 py-1 rounded-full text-[10px] font-bold">
                                    Destaque
                                </span>
                            )}
                            <Text variant="title" as="h2" className="text-xl font-bold text-[#4F2B33] dark:text-[#D0C697] mt-2">
                                {project.title}
                            </Text>
                            <span className="text-sm font-bold opacity-80">
                                {language === 'en' ? project.subtitleEn : project.subtitleBr}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ----------------------------------------------------------------------
    // 4. A VERSÃO DESKTOP INTACTA
    // ----------------------------------------------------------------------
    return (
        <div className="min-h-screen pt-4 pb-[600px] px-6 bg-[#D0C697] dark:bg-[#272516] flex flex-col items-center">

            <div className="absolute z-0 w-[500px] h-[500px] top-20 -left-20 bg-[#4F2B33]/5 dark:bg-[#91B09A]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-20 flex flex-col items-center gap-2 text-center w-full max-w-6xl mx-auto shrink-0 mb-[40px]">
                <Text variant="title" as="h1" className="text-5xl md:text-6xl font-bold text-[#4F2B33] dark:text-[#D0C697]">
                    {language === 'en' ? 'My Projects' : 'Meus Projetos'}
                </Text>
                <div className="flex items-center gap-3 text-[#4F2B33]/80 dark:text-[#91B09A]/90 mt-2">
                    <div className="w-10 h-px bg-current opacity-40" />
                    <Text variant="text" as="p" className="text-xl tracking-widest">
                        {language === 'en' ? 'Highlights so far' : 'Destaques até Agora'}
                    </Text>
                    <div className="w-10 h-px bg-current opacity-40" />
                </div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-20 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6"
            >
                {projects.map((project, index) => {
                    const isFeatured = project.featured;

                    return (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className={`group relative flex flex-col justify-between p-6 md:p-8 rounded-2xl border transition-all duration-300 ease-out
                                ${isFeatured
                                ? 'border-[#4F2B33]/30 dark:border-[#91B09A]/40 bg-[#4F2B33]/[0.04] dark:bg-[#91B09A]/10 shadow-[0_15px_50px_-15px_rgba(79,43,51,0.4)] dark:shadow-[0_15px_50px_-15px_rgba(145,176,154,0.2)] md:-translate-y-6 z-10'
                                : 'border-[#4F2B33]/15 dark:border-[#91B09A]/20 bg-transparent hover:bg-[#4F2B33]/[0.02] dark:hover:bg-[#91B09A]/[0.02] hover:-translate-y-2 hover:shadow-xl'
                            }
                            `}
                        >
                            {isFeatured && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4F2B33] dark:bg-[#91B09A] text-[#D0C697] dark:text-[#272516] px-5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold shadow-md whitespace-nowrap">
                                    {language === 'en' ? 'Magnum Opus' : 'Magnum Opus'}
                                </div>
                            )}

                            <div className={`absolute top-6 right-6 transition-colors duration-300 ${isFeatured ? 'text-[#4F2B33] dark:text-[#91B09A] animate-pulse' : 'text-[#4F2B33]/20 dark:text-[#91B09A]/30 group-hover:text-[#4F2B33] dark:group-hover:text-[#91B09A]'}`}>
                                <SparkleIcon />
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <Text variant="title" as="h2" className="text-2xl md:text-3xl font-bold text-[#4F2B33] dark:text-[#D0C697] pr-8">
                                        {project.title}
                                    </Text>
                                    <Text variant="text" as="p" className="text-xs font-medium tracking-widest uppercase mt-1 text-[#4F2B33]/70 dark:text-[#91B09A]/80">
                                        {language === 'en' ? project.subtitleEn : project.subtitleBr}
                                    </Text>
                                </div>

                                <Text variant="text" as="p" className="text-[#4F2B33]/90 dark:text-[#91B09A]/95 leading-relaxed text-[13px] md:text-sm">
                                    {language === 'en' ? project.descriptionEn : project.descriptionBr}
                                </Text>

                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <div key={tagIndex} className="px-3 py-1 rounded bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 text-[#4F2B33] dark:text-[#91B09A] text-[10px] font-bold tracking-wider uppercase">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {project.links.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-5 mt-6 border-t border-[#4F2B33]/15 dark:border-[#91B09A]/20">
                                    {project.links.map((link, linkIndex) => (
                                        <a
                                            key={linkIndex}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#4F2B33] dark:bg-[#91B09A] text-[#D0C697] dark:text-[#272516] text-[11px] font-bold tracking-wider hover:-translate-y-0.5 transition-transform shadow-sm"
                                        >
                                            <GitHubIcon />
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>

        </div>
    );
}
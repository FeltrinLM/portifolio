import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { useMediaQuery } from 'react-responsive'; // <-- 1. Importe o hook

const CIRCLE_RADIUS = 200;
const ORBIT_RADIUS = 272;
const CENTER = 320;
const MIN_RADIUS = 176;
const MAX_RADIUS = 304;
const SNAP_DISTANCE = 248;

// Ícones minimalistas criados para a Navbar do celular
const NavIcons = {
    '/sobre': <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
    '/experiencia': <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
    '/projetos': <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    '/contato': <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};

const PIECES = [
    { id: '/sobre', label: { br: 'Sobre', en: 'About' }, gap: 14, icon: NavIcons['/sobre'] },
    { id: '/experiencia', label: { br: 'Experiência', en: 'Experience' }, gap: 28, icon: NavIcons['/experiencia'] },
    { id: '/projetos', label: { br: 'Projetos', en: 'Projects' }, gap: 20, icon: NavIcons['/projetos'] },
    { id: '/contato', label: { br: 'Contato', en: 'Contact' }, gap: 18, icon: NavIcons['/contato'] },
];

const RUNES = "ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛟ ᛞ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ";
const DOUBLE_RUNES = RUNES + " " + RUNES;

function getPosition(angle, radius) {
    const rad = (angle * Math.PI) / 180;
    return {
        x: CENTER + radius * Math.sin(rad),
        y: CENTER - radius * Math.cos(rad),
    };
}

function getTargetAngle(index, activeIndex) {
    if (index === activeIndex) return 0;
    const inactiveIndices = [0, 1, 2, 3].filter(i => i !== activeIndex);
    const pos = inactiveIndices.indexOf(index);
    const angles = [-70, 0, 70];
    return angles[pos];
}

function FragmentoDeMenu({ id, label, baseAngle, isActive, circleRotation, isSnapping }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        disabled: isActive
    });

    const currentBaseAngle = isActive ? circleRotation : baseAngle;
    const currentRadius = isActive ? CIRCLE_RADIUS : ORBIT_RADIUS;
    const { x: startX, y: startY } = getPosition(currentBaseAngle, currentRadius);

    let finalTransform = transform;
    let currentAngle = currentBaseAngle;

    if (transform && isDragging) {
        const rawX = startX + transform.x;
        const rawY = startY + transform.y;
        const dx = rawX - CENTER;
        const dy = rawY - CENTER;
        const distance = Math.hypot(dx, dy);

        const clampedDistance = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, distance));
        const clampedX = CENTER + (dx / distance) * clampedDistance;
        const clampedY = CENTER + (dy / distance) * clampedDistance;

        finalTransform = {
            ...transform,
            x: clampedX - startX,
            y: clampedY - startY
        };

        currentAngle = (Math.atan2(clampedX - CENTER, CENTER - clampedY) * 180) / Math.PI;
    }

    const isGhosted = isActive && isSnapping;
    const dynamicClass = isActive
        ? 'cursor-default text-[#4F2B33] dark:text-[#a4c5ae]'
        : 'cursor-grab active:cursor-grabbing hover:brightness-125 text-[#3B381E] dark:text-[#D0C697]';

    const style = {
        position: 'absolute',
        left: `${startX - 56}px`,
        top: `${startY - 24}px`,
        transform: finalTransform
            ? `translate3d(${finalTransform.x}px, ${finalTransform.y}px, 0) rotate(${currentAngle}deg) scale(1.15)`
            : `rotate(${currentAngle}deg) scale(${isGhosted ? 0.5 : 1})`,
        transformOrigin: 'center center',
        zIndex: isActive ? 20 : (isDragging ? 50 : 10),
        opacity: isGhosted ? 0 : 1,
        pointerEvents: isActive ? 'none' : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`select-none touch-none ${dynamicClass} ${isDragging ? '' : 'transition-all duration-500 ease-out'}`}
        >
            <svg width="112" height="48" viewBox="0 0 112 48" className="overflow-visible pointer-events-none fill-current">
                <path id={`curve-${label}`} d="M -10,35.2 A 200,200 0 0,1 122,35.2" fill="none" />
                <text
                    fontSize={isActive ? "21" : "19"}
                    fontFamily="'Cormorant Garamond', serif"
                    fontWeight="700"
                    letterSpacing="2"
                    dominantBaseline="middle"
                    style={{
                        filter: isActive ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                        transition: 'all 0.3s'
                    }}
                >
                    <textPath href={`#curve-${label}`} startOffset="50%" textAnchor="middle">
                        {label}
                    </textPath>
                </text>
            </svg>
        </div>
    );
}

export function Navbar({ language = 'br', tutorialMode = false, onTutorialComplete }) {
    // 2. Hook de detecção no topo
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const navigate = useNavigate();
    const location = useLocation();

    const [dragId, setDragId] = useState(null);
    const [circleRotation, setCircleRotation] = useState(0);
    const [isSnapping, setIsSnapping] = useState(false);

    const activeIndex = Math.max(0, PIECES.findIndex(p => p.id === location.pathname));
    const currentTargetId = isSnapping && dragId ? dragId : location.pathname;
    const targetPiece = PIECES.find(p => p.id === currentTargetId) || PIECES[0];
    const currentGap = targetPiece.gap;

    const startGap = getPosition(currentGap, CIRCLE_RADIUS);
    const endGap = getPosition(-currentGap, CIRCLE_RADIUS);

    function handleDragStart(event) {
        setDragId(event.active.id);
    }

    function handleDragMove(event) {
        const { active, delta } = event;
        const pieceIndex = PIECES.findIndex(p => p.id === active.id);
        if (pieceIndex === -1) return;

        const baseAngle = getTargetAngle(pieceIndex, activeIndex);
        const { x: startX, y: startY } = getPosition(baseAngle, ORBIT_RADIUS);
        const dx = startX + delta.x - CENTER;
        const dy = CENTER - (startY + delta.y);

        if (Math.hypot(dx, dy) < SNAP_DISTANCE) {
            setCircleRotation((Math.atan2(dx, dy) * 180) / Math.PI);
            setIsSnapping(true);
        } else {
            setCircleRotation(0);
            setIsSnapping(false);
        }
    }

    function handleDragEnd(event) {
        if (isSnapping) {
            if (tutorialMode) {
                // MUDANÇA: Disparando a transição de página ao finalizar o tutorial
                if (document.startViewTransition) {
                    document.documentElement.classList.add('page-transition');
                    const transition = document.startViewTransition(() => {
                        flushSync(() => {
                            if (onTutorialComplete) onTutorialComplete();
                        });
                    });
                    transition.finished.finally(() => {
                        document.documentElement.classList.remove('page-transition');
                    });
                } else {
                    if (onTutorialComplete) onTutorialComplete();
                }
            } else {
                // Comportamento normal de roteamento
                const novaRota = event.active.id;
                if (document.startViewTransition && novaRota !== location.pathname) {
                    document.documentElement.classList.add('page-transition');
                    const transition = document.startViewTransition(() => {
                        flushSync(() => navigate(novaRota));
                    });
                    transition.finished.finally(() => {
                        document.documentElement.classList.remove('page-transition');
                    });
                } else if (novaRota !== location.pathname) {
                    navigate(novaRota);
                }
            }
        }
        setCircleRotation(0);
        setIsSnapping(false);
        setDragId(null);
    }

    // ----------------------------------------------------------------------
    // 3. A INTERCEPTAÇÃO MOBILE (BOTTOM NAVIGATION BAR)
    // ----------------------------------------------------------------------
    if (isMobile) {
        // Se estiver no tutorial, exibe apenas um botão grande para continuar
        if (tutorialMode) {
            return (
                <div className="fixed bottom-0 left-0 w-full p-6 z-50 bg-gradient-to-t from-[#D0C697] dark:from-[#272516] to-transparent">
                    <button
                        onClick={() => {
                            if (document.startViewTransition) {
                                document.documentElement.classList.add('page-transition');
                                const transition = document.startViewTransition(() => {
                                    flushSync(() => {
                                        if (onTutorialComplete) onTutorialComplete();
                                    });
                                });
                                transition.finished.finally(() => {
                                    document.documentElement.classList.remove('page-transition');
                                });
                            } else {
                                if (onTutorialComplete) onTutorialComplete();
                            }
                        }}
                        className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm bg-[#4F2B33] dark:bg-[#91B09A] text-[#D0C697] dark:text-[#272516] shadow-xl active:scale-95 transition-transform"
                    >
                        {language === 'en' ? 'Start Journey' : 'Iniciar Jornada'}
                    </button>
                </div>
            );
        }

        // Navegação normal do Mobile (Barra inferior com ícones)
        return (
            <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-16 rounded-2xl flex items-center justify-around px-2 z-50 bg-[#D0C697]/90 dark:bg-[#272516]/90 backdrop-blur-md border border-[#4F2B33]/20 dark:border-[#91B09A]/20 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                {PIECES.map((piece) => {
                    const isActive = location.pathname === piece.id;

                    return (
                        <button
                            key={piece.id}
                            onClick={() => navigate(piece.id)}
                            className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                                isActive
                                    ? 'text-[#D0C697] dark:text-[#272516] bg-[#4F2B33] dark:bg-[#91B09A] shadow-md -translate-y-2'
                                    : 'text-[#4F2B33]/70 dark:text-[#91B09A]/70 hover:text-[#4F2B33] dark:hover:text-[#91B09A]'
                            }`}
                        >
                            <div className="scale-90">{piece.icon}</div>

                            {/* Pontinho abaixo do ícone se estiver ativo */}
                            {isActive && (
                                <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-[#4F2B33] dark:bg-[#91B09A]" />
                            )}
                        </button>
                    );
                })}
            </nav>
        );
    }

    // ----------------------------------------------------------------------
    // 4. A VERSÃO DESKTOP INTACTA
    // ----------------------------------------------------------------------
    return (
        <nav className="fixed bottom-0 left-0 w-full h-[320px] flex justify-center z-50 pointer-events-none overflow-hidden">
            <div className="relative w-[640px] h-[640px] pointer-events-auto">
                <DndContext onDragStart={handleDragStart} onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
                    <svg
                        width="640"
                        height="640"
                        className={`absolute top-0 left-0 transition-transform duration-150 ease-out ${isSnapping ? 'text-[#4F2B33] dark:text-[#a4c5ae]' : 'text-[#4F2B33] dark:text-[#91B09A]'}`}
                        style={{
                            transform: `rotate(${circleRotation}deg)`,
                            transformOrigin: '320px 320px'
                        }}
                    >
                        <g className="animate-[spin_40s_linear_infinite] opacity-50" style={{ transformOrigin: '320px 320px' }}>
                            <path id="outer-rune-path" d="M 320,105 A 215,215 0 1,1 319.9,105" fill="none" />
                            <text fill="currentColor" fontSize="14" letterSpacing="10" fontWeight="bold">
                                <textPath href="#outer-rune-path" startOffset="0%">
                                    {DOUBLE_RUNES}
                                </textPath>
                            </text>
                        </g>

                        <g className="animate-[spin_60s_linear_infinite_reverse] opacity-70" style={{ transformOrigin: '320px 320px' }}>
                            <path id="inner-rune-path" d="M 320,135 A 185,185 0 1,1 319.9,135" fill="none" />
                            <text fill="currentColor" fontSize="12" letterSpacing="8" fontWeight="bold">
                                <textPath href="#inner-rune-path" startOffset="0%">
                                    {RUNES}
                                </textPath>
                            </text>
                        </g>

                        <path
                            d={`M ${startGap.x},${startGap.y} A 200,200 0 1,1 ${endGap.x},${endGap.y}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            style={{
                                filter: isSnapping ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                                transition: 'all 0.3s'
                            }}
                        />

                        <g fill="currentColor" style={{ transition: 'all 0.3s' }} className={tutorialMode && !isSnapping ? 'animate-pulse' : ''}>
                            <polygon
                                points="-4,0 0,-4 4,0 0,4"
                                transform={`translate(${startGap.x}, ${startGap.y}) rotate(${currentGap})`}
                            />
                            <polygon
                                points="-4,0 0,-4 4,0 0,4"
                                transform={`translate(${endGap.x}, ${endGap.y}) rotate(${-currentGap})`}
                            />
                        </g>
                    </svg>

                    {PIECES.map((piece, index) => {
                        const isActive = location.pathname === piece.id;

                        // Oculta a opção central se for o tutorial
                        if (tutorialMode && isActive) {
                            return null;
                        }

                        const labelText = tutorialMode
                            ? (language === 'en' ? 'Continue' : 'Continuar')
                            : piece.label[language];

                        return (
                            <FragmentoDeMenu
                                key={piece.id}
                                id={piece.id}
                                label={labelText}
                                baseAngle={getTargetAngle(index, activeIndex)}
                                isActive={isActive}
                                circleRotation={circleRotation}
                                isSnapping={isSnapping}
                            />
                        );
                    })}
                </DndContext>
            </div>
        </nav>
    );
}
import { useState } from 'react';
import { DndContext, useDraggable, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';

const CX = 50, CY = 50;
const RUNES = "ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛟ ᛞ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ";
const DOUBLE_RUNES = RUNES + " " + RUNES;

function polarToXY(cx, cy, r, angleDeg) {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function buildBeadRim(r, count) {
    return Array.from({ length: count }, (_, i) => polarToXY(CX, CY, r, (360 / count) * i));
}

function buildRopePath(rInner, rOuter, count) {
    const pts = Array.from({ length: count + 1 }, (_, i) => {
        const angle = (360 / count) * i;
        const r = i % 2 === 0 ? rOuter : rInner;
        return polarToXY(CX, CY, r, angle);
    });
    return 'M ' + pts.map(p => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' L ') + ' Z';
}

function buildRadialTicks(rInner, rOuter, count) {
    return Array.from({ length: count }, (_, i) => {
        const angle = (360 / count) * i;
        const p1 = polarToXY(CX, CY, rInner, angle);
        const p2 = polarToXY(CX, CY, rOuter, angle);
        return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
    });
}

const BEAD_DOTS = buildBeadRim(46, 30);
const ROPE_PATH = buildRopePath(37.5, 41.5, 40);
const TICKS = buildRadialTicks(24, 34, 32);

function CoinFace() {
    return (
        <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full text-[#4F2B33] dark:text-[#91B09A] pointer-events-none"
        >
            {BEAD_DOTS.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={1.1} fill="currentColor" />
            ))}

            <path d={ROPE_PATH} fill="none" stroke="currentColor" strokeWidth={1.1} opacity={0.85} />

            {TICKS.map((t, i) => (
                <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="currentColor" strokeWidth={0.6} opacity={0.55} />
            ))}

            <circle cx={CX} cy={CY} r={17} fill="none" stroke="currentColor" strokeWidth={1.2} />
            <rect x={CX - 12} y={CY - 12} width={24} height={24} transform={`rotate(45 ${CX} ${CY})`} fill="none" stroke="currentColor" strokeWidth={0.8} opacity={0.6} />
        </svg>
    );
}

function MoedaMagica({ id, position, language, onToggle }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
    const [flipDegrees, setFlipDegrees] = useState(language === 'en' ? 180 : 0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [tossPhase, setTossPhase] = useState('idle');
    const [runeScale, setRuneScale] = useState(1);
    const [runeOpacity, setRuneOpacity] = useState(0.5);
    const [isExpanding, setIsExpanding] = useState(false);

    let currentX = position.x;
    let currentY = position.y;

    if (transform && isDragging) {
        currentX += transform.x;
        currentY += transform.y;
    }

    function handleClick() {
        if (isFlipping) return;
        setIsFlipping(true);
        setIsExpanding(true);
        setFlipDegrees(prev => prev + 540);

        setTossPhase('up');

        setTimeout(() => {
            onToggle();
        }, 250);

        setTimeout(() => setTossPhase('down'), 400);

        setRuneScale(10);
        setRuneOpacity(0);

        setTimeout(() => {
            setTossPhase('idle');
            setIsFlipping(false);
            setIsExpanding(false);
            setRuneScale(1);
            setRuneOpacity(0.5);
        }, 900);
    }

    const wrapperStyle = {
        position: 'absolute',
        top: '32px',
        left: '32px',
        width: '56px',
        height: '56px',
        transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
        zIndex: isDragging ? 50 : 10,
        perspective: '1200px'
    };

    const tossStyle = {
        transform: tossPhase === 'up'
            ? 'translateY(-58px) scale(1.28)'
            : 'translateY(0px) scale(1)',
        transition: tossPhase === 'up'
            ? 'transform 400ms cubic-bezier(0.33, 1, 0.68, 1)'
            : 'transform 500ms cubic-bezier(0.55, 0, 1, 0.45)'
    };

    const flipStyle = {
        transformStyle: 'preserve-3d',
        transform: `rotateX(${flipDegrees}deg)`,
        transition: 'transform 900ms cubic-bezier(0.45, 0.05, 0.55, 0.95)'
    };

    const faceBase = "absolute inset-0 rounded-full flex flex-col items-center justify-center " +
        "bg-[#D0C697] dark:bg-[#3B381E] border-[3px] border-[#4F2B33] dark:border-[#91B09A]";

    return (
        <div style={wrapperStyle} className="pointer-events-auto">

            <div
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                    width: '100px',
                    height: '100px',
                    marginLeft: '-50px',
                    marginTop: '-50px',
                    transform: `scale(${runeScale})`,
                    opacity: runeOpacity,
                    transition: isExpanding
                        ? 'transform 900ms cubic-bezier(0.25, 1, 0.5, 1), opacity 700ms ease-out'
                        : 'opacity 500ms ease-in'
                }}
            >
                <svg width="100" height="100" viewBox="0 0 100 100" className="animate-[spin_20s_linear_infinite] text-[#4F2B33] dark:text-[#91B09A]">
                    <path id="coin-rune-path" d="M 50,15 A 35,35 0 1,1 49.9,15" fill="none" />
                    <text fill="currentColor" fontSize="8" letterSpacing="4.5" fontWeight="bold">
                        <textPath href="#coin-rune-path" startOffset="0%">
                            {DOUBLE_RUNES}
                        </textPath>
                    </text>
                </svg>
            </div>

            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                onClick={handleClick}
                className={`absolute inset-0 cursor-grab active:cursor-grabbing touch-none transition-transform duration-300 ease-out ${isDragging ? 'scale-110' : 'scale-100'}`}
            >
                <div style={tossStyle} className="relative w-14 h-14 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
                    <div style={flipStyle} className="relative w-full h-full">
                        <div className={faceBase} style={{ backfaceVisibility: 'hidden' }}>
                            <CoinFace />
                            <span
                                className="relative z-10 text-[#4F2B33] dark:text-[#91B09A] font-serif font-black text-xl tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                                style={{ WebkitTextStroke: '0.5px currentColor' }}
                            >
                                BR
                            </span>
                        </div>

                        <div className={faceBase} style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
                            <CoinFace />
                            <span
                                className="relative z-10 text-[#4F2B33] dark:text-[#91B09A] font-serif font-black text-xl tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                                style={{ WebkitTextStroke: '0.5px currentColor' }}
                            >
                                EN
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LanguageToggle({ language, onLanguageChange }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
    );

    function handleDragEnd(event) {
        const { delta } = event;

        let finalX = position.x + delta.x;
        let finalY = position.y + delta.y;

        finalX = Math.max(-10, Math.min(window.innerWidth - 70, finalX));
        finalY = Math.max(-10, Math.min(window.innerHeight - 70, finalY));

        setPosition({ x: finalX, y: finalY });
    }

    function handleToggle() {
        onLanguageChange(language === 'br' ? 'en' : 'br');
    }

    return (
        <div className="fixed top-0 left-0 z-50 pointer-events-none w-full h-full overflow-hidden">
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <MoedaMagica
                    id="language-coin"
                    position={position}
                    language={language}
                    onToggle={handleToggle}
                />
            </DndContext>
        </div>
    );
}
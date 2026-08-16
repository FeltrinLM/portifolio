import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { DndContext, useDraggable } from '@dnd-kit/core';

const CIRCLE_RADIUS = 200;
const ORBIT_RADIUS = 272;
const CENTER = 320;
const MIN_RADIUS = 176;
const MAX_RADIUS = 304;
const SNAP_DISTANCE = 248;

const PIECES = [
    { id: '/sobre', label: 'Sobre', angle: -68 },
    { id: '/experiencia', label: 'Experiência', angle: -24 },
    { id: '/projetos', label: 'Projetos', angle: 24 },
    { id: '/contato', label: 'Contato', angle: 68 },
];

const RUNES = "ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛟ ᛞ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ";

function getPosition(angle, radius) {
    const rad = (angle * Math.PI) / 180;
    return {
        x: CENTER + radius * Math.sin(rad),
        y: CENTER - radius * Math.cos(rad),
    };
}

function FragmentoDeMenu({ id, label, angle, isActive, circleRotation, isSnapping }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        disabled: isActive
    });

    const currentBaseAngle = isActive ? circleRotation : angle;
    const currentRadius = isActive ? CIRCLE_RADIUS + 7 : ORBIT_RADIUS;
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
        ? 'cursor-default text-[#a4c5ae] dark:text-[#a4c5ae]'
        : 'cursor-grab active:cursor-grabbing hover:brightness-125';

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
            className={`select-none text-[#2f3e35] dark:text-[#D0C697] touch-none drop-shadow-lg ${dynamicClass} ${isDragging ? '' : 'transition-all duration-500 ease-out'}`}
        >
            <svg width="112" height="48" viewBox="0 0 112 48" className="overflow-visible pointer-events-none fill-current">
                <path id={`curve-${label}`} d="M -10,40 A 200,200 0 0,1 122,40" fill="none" />
                <text
                    fontSize={isActive ? "20" : "18"}
                    fontFamily="'Cormorant Garamond', serif"
                    fontWeight="700"
                    letterSpacing="2"
                    style={{
                        filter: isActive ? 'drop-shadow(0 0 10px rgba(164,197,174,0.8))' : 'none',
                        transition: 'all 0.3s'
                    }}
                >
                    <textPath href={`#curve-${label}`} startOffset="50%" textAnchor="middle">
                        {isActive ? `✦ ${label} ✦` : `✧ ${label} ✧`}
                    </textPath>
                </text>
            </svg>
        </div>
    );
}

export function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [circleRotation, setCircleRotation] = useState(0);
    const [isSnapping, setIsSnapping] = useState(false);

    function handleDragMove(event) {
        const { active, delta } = event;
        const activePiece = PIECES.find(p => p.id === active.id);
        if (!activePiece) return;

        const { x: startX, y: startY } = getPosition(activePiece.angle, ORBIT_RADIUS);
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
        setCircleRotation(0);
        setIsSnapping(false);
    }

    const strokeColor = isSnapping ? "#a4c5ae" : "#91B09A";

    return (
        <nav className="fixed bottom-0 left-0 w-full h-[320px] flex justify-center z-50 pointer-events-none overflow-hidden">
            <div className="relative w-[640px] h-[640px] pointer-events-auto">
                <DndContext onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
                    <svg
                        width="640"
                        height="640"
                        className="absolute top-0 left-0 transition-transform duration-150 ease-out"
                        style={{
                            transform: `rotate(${circleRotation}deg)`,
                            transformOrigin: '320px 320px'
                        }}
                    >
                        <circle
                            cx="320" cy="320" r="215"
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="1"
                            strokeDasharray="4 12"
                            className="animate-[spin_40s_linear_infinite] opacity-50"
                            style={{ transformOrigin: '320px 320px' }}
                        />
                        <g className="animate-[spin_60s_linear_infinite_reverse] opacity-40 dark:opacity-30" style={{ transformOrigin: '320px 320px' }}>
                            <path id="rune-path" d="M 320,135 A 185,185 0 1,1 319.9,135" fill="none" />
                            <text fill="#91B09A" fontSize="12" letterSpacing="6">
                                <textPath href="#rune-path" startOffset="0%">
                                    {RUNES}
                                </textPath>
                            </text>
                        </g>
                        <path
                            d="M 375,127.8 A 200,200 0 1,1 265,127.8"
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            style={{
                                filter: isSnapping ? 'drop-shadow(0 0 10px rgba(164,197,174,0.8))' : 'none',
                                transition: 'all 0.3s'
                            }}
                        />
                        <g fill={strokeColor} style={{ transition: 'all 0.3s' }}>
                            <polygon points="375,123.8 379,127.8 375,131.8 371,127.8" />
                            <polygon points="265,123.8 269,127.8 265,131.8 261,127.8" />
                        </g>
                    </svg>
                    {PIECES.map(piece => (
                        <FragmentoDeMenu
                            key={piece.id}
                            id={piece.id}
                            label={piece.label}
                            angle={piece.angle}
                            isActive={location.pathname === piece.id}
                            circleRotation={circleRotation}
                            isSnapping={isSnapping}
                        />
                    ))}
                </DndContext>
            </div>
        </nav>
    );
}
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// --- CONFIGURAÇÃO DA MAGIA ---
const CIRCLE_RADIUS = 250;
const ORBIT_RADIUS = 340;
const CENTER = 400;

const PIECES = [
    { id: '/sobre', label: 'Sobre', angle: -68 },
    { id: '/experiencia', label: 'Experiência', angle: -24 },
    { id: '/projetos', label: 'Projetos', angle: 24 },
    { id: '/contato', label: 'Contato', angle: 68 },
];

function getPosition(angle, radius) {
    const rad = (angle * Math.PI) / 180;
    return {
        x: CENTER + radius * Math.sin(rad),
        y: CENTER - radius * Math.cos(rad),
    };
}

// 1. As Peças (Fragmentos do Menu)
function FragmentoDeMenu({ id, label, angle, isActive, circleRotation, isSnapping }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        disabled: isActive
    });

    const currentBaseAngle = isActive ? circleRotation : angle;
    const currentRadius = isActive ? CIRCLE_RADIUS + 15 : ORBIT_RADIUS;
    const { x: startX, y: startY } = getPosition(currentBaseAngle, currentRadius);

    let finalTransform = transform;
    let currentAngle = currentBaseAngle;

    if (transform && isDragging) {
        const rawX = startX + transform.x;
        const rawY = startY + transform.y;
        const dx = rawX - CENTER;
        const dy = rawY - CENTER;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const MIN_RADIUS = 220;
        const MAX_RADIUS = 380;
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

    const style = {
        position: 'absolute',
        left: `${startX - 70}px`,
        top: `${startY - 30}px`,
        transform: finalTransform
            ? `translate3d(${finalTransform.x}px, ${finalTransform.y}px, 0) rotate(${currentAngle}deg) scale(1.1)`
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
            // 1. A MÁGICA AQUI: Adicionamos "select-none" para impedir o navegador de grifar o texto
            className={`select-none ${isActive ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:brightness-110'} touch-none drop-shadow-lg ${
                isDragging ? '' : 'transition-all duration-500 ease-out'
            }`}
        >
            {/* 2. E AQUI: Adicionamos "pointer-events-none" para o clique ir direto para a div arrastável */}
            <svg width="140" height="60" viewBox="0 0 140 60" className="overflow-visible pointer-events-none">
                <path id={`curve-${label}`} d="M 10,50 A 250,250 0 0,1 130,50" fill="none" />
                <path
                    d="M 10,45 A 250,250 0 0,1 130,45"
                    fill="none"
                    stroke={isActive ? "#a4c5ae" : "#91B09A"}
                    strokeWidth="26"
                    strokeLinecap="round"
                    style={{ filter: isActive ? 'drop-shadow(0 0 10px rgba(164,197,174,0.4))' : 'none' }}
                />
                <text fill="#2f3e35" fontSize="18" fontFamily="'Cormorant Garamond', serif" fontWeight="700" letterSpacing="1">
                    <textPath href={`#curve-${label}`} startOffset="50%" textAnchor="middle">
                        {label}
                    </textPath>
                </text>
            </svg>
        </div>
    );
}

// 2. O Componente Principal Navbar
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
        const currentX = startX + delta.x;
        const currentY = startY + delta.y;

        const dx = currentX - CENTER;
        const dy = CENTER - currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 310) {
            const theta = (Math.atan2(dx, dy) * 180) / Math.PI;
            setCircleRotation(theta);
            setIsSnapping(true);
        } else {
            setCircleRotation(0);
            setIsSnapping(false);
        }
    }

    function handleDragEnd(event) {
        if (isSnapping) {
            const novaRota = event.active.id;

            // Lógica de transição específica para as páginas
            if (document.startViewTransition) {
                document.documentElement.classList.add('page-transition');

                const transition = document.startViewTransition(() => {
                    flushSync(() => {
                        navigate(novaRota);
                    });
                });

                transition.finished.finally(() => {
                    document.documentElement.classList.remove('page-transition');
                });
            } else {
                navigate(novaRota);
            }
        }
        setCircleRotation(0);
        setIsSnapping(false);
    }

    return (
        <nav className="fixed bottom-0 left-0 w-full h-[400px] flex justify-center z-50 pointer-events-none overflow-hidden">
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap');`}
            </style>

            <div className="relative w-[800px] h-[800px] pointer-events-auto">
                <DndContext onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
                    <svg
                        width="800"
                        height="800"
                        className="absolute top-0 left-0 transition-transform duration-150 ease-out"
                        style={{
                            transform: `rotate(${circleRotation}deg)`,
                            transformOrigin: '400px 400px'
                        }}
                    >
                        <path
                            d="M 468.9,159.7 A 250,250 0 1,1 331.1,159.7"
                            fill="none"
                            stroke={isSnapping ? "#a4c5ae" : "#91B09A"}
                            strokeWidth="12"
                            strokeLinecap="round"
                            style={{
                                filter: isSnapping ? 'drop-shadow(0 0 15px rgba(164,197,174,0.6))' : 'none',
                                transition: 'all 0.3s'
                            }}
                        />
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
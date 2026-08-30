import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { DndContext, useDraggable } from '@dnd-kit/core';

const MAGNETIC_RADIUS = 60;

function IconeMagico({ id, type, position, innerRef }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    let currentX = position.x;
    let currentY = position.y;

    if (transform && isDragging) {
        currentX = Math.max(-window.innerWidth, Math.min(window.innerWidth, position.x + transform.x));
        currentY = Math.max(-window.innerHeight, Math.min(window.innerHeight, position.y + transform.y));
    }

    const style = {
        position: 'absolute',
        top: '4px',
        left: '4px',
        transform: `translate3d(${currentX}px, ${currentY}px, 0) scale(${isDragging ? 1.15 : 1})`,
        zIndex: isDragging ? 50 : 10,
    };

    return (
        <div
            ref={(node) => {
                setNodeRef(node);
                if (innerRef) innerRef.current = node;
            }}
            style={style}
            {...listeners}
            {...attributes}
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing hover:brightness-110 drop-shadow-lg bg-[#4F2B33] dark:bg-[#91B09A] text-[#D0C697] ${isDragging ? '' : 'transition-transform duration-300 ease-out'}`}
        >
            {type === 'sun' ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none">
                    <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            )}
        </div>
    );
}

function CirculoReceptor({ isHovered, innerRef }) {
    return (
        <div
            ref={innerRef}
            className={`absolute top-0 left-0 w-12 h-12 rounded-full border-[3px] transition-all duration-300 z-0 backdrop-blur-sm pointer-events-auto ${
                isHovered
                    ? 'border-[#4F2B33] dark:border-[#a4c5ae] bg-[#4F2B33]/30 dark:bg-[#91B09A]/30 scale-110 shadow-[0_0_20px_rgba(79,43,51,0.6)] dark:shadow-[0_0_20px_rgba(164,197,174,0.6)]'
                    : 'border-dashed border-[#4F2B33] dark:border-[#91B09A] bg-[#4F2B33]/10 dark:bg-[#91B09A]/10 shadow-[0_0_10px_rgba(79,43,51,0.2)] dark:shadow-[0_0_10px_rgba(145,176,154,0.2)] scale-100'
            }`}
        />
    );
}

export function ThemeToggle({ isDarkMode, onThemeChange, tutorialMode = false }) {
    const [isHovered, setIsHovered] = useState(false);
    const circleRef = useRef(null);

    const [positions, setPositions] = useState({
        'light-mode': isDarkMode ? { x: -70, y: 0 } : { x: 0, y: 0 },
        'dark-mode': isDarkMode ? { x: 0, y: 0 } : { x: -70, y: 0 }
    });

    function changeThemeWithAnimation(isDark) {
        if (!document.startViewTransition) {
            onThemeChange(isDark);
            return;
        }

        document.documentElement.classList.add('theme-transition');
        const transition = document.startViewTransition(() => {
            flushSync(() => onThemeChange(isDark));
        });

        transition.finished.finally(() => {
            document.documentElement.classList.remove('theme-transition');
        });
    }

    function handleDragMove(event) {
        const { active, delta } = event;
        const currentX = positions[active.id].x + delta.x;
        const currentY = positions[active.id].y + delta.y;
        setIsHovered(Math.hypot(currentX, currentY) < MAGNETIC_RADIUS);
    }

    function handleDragEnd(event) {
        const { active, delta } = event;
        const currentX = Math.max(-window.innerWidth, Math.min(window.innerWidth, positions[active.id].x + delta.x));
        const currentY = Math.max(-window.innerHeight, Math.min(window.innerHeight, positions[active.id].y + delta.y));

        setIsHovered(false);

        if (Math.hypot(currentX, currentY) < MAGNETIC_RADIUS) {
            const isDraggingLight = active.id === 'light-mode';
            if ((isDraggingLight && isDarkMode) || (!isDraggingLight && !isDarkMode)) {
                changeThemeWithAnimation(!isDraggingLight);
            }

            setPositions(prev => ({
                'light-mode': isDraggingLight ? { x: 0, y: 0 } : (prev['light-mode'].x === 0 && prev['light-mode'].y === 0 ? { x: -70, y: 0 } : prev['light-mode']),
                'dark-mode': !isDraggingLight ? { x: 0, y: 0 } : (prev['dark-mode'].x === 0 && prev['dark-mode'].y === 0 ? { x: -70, y: 0 } : prev['dark-mode'])
            }));
        } else {
            // MUDANÇA AQUI: Efeito Elástico!
            // Se o usuário soltar FORA do círculo e estiver no tutorial, volta pra posição inicial.
            if (tutorialMode) {
                setPositions({
                    'light-mode': isDarkMode ? { x: -70, y: 0 } : { x: 0, y: 0 },
                    'dark-mode': isDarkMode ? { x: 0, y: 0 } : { x: -70, y: 0 }
                });
            } else {
                // Comportamento normal: O ícone fica onde o usuário soltou.
                setPositions(prev => ({
                    ...prev,
                    [active.id]: { x: currentX, y: currentY }
                }));
            }
        }
    }

    // MUDANÇA AQUI: Removido o 'scale-150' para arrumar a física do mouse
    const positionClasses = tutorialMode
        ? "top-[50vh] right-[50vw] translate-x-[calc(50%+35px)] -translate-y-1/2"
        : "top-8 right-8 translate-x-0 translate-y-0";

    return (
        <div className={`fixed z-[60] w-12 h-12 pointer-events-auto transition-all duration-1000 ease-in-out ${positionClasses}`}>
            <DndContext onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
                <CirculoReceptor isHovered={isHovered} innerRef={circleRef} />
                <IconeMagico id="light-mode" type="sun" position={positions['light-mode']} />
                <IconeMagico id="dark-mode" type="moon" position={positions['dark-mode']} />
            </DndContext>
        </div>
    );
}
import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { DndContext, useDraggable } from '@dnd-kit/core';

const MAGNETIC_RADIUS = 60;
const DISTANCE_THRESHOLD = 95;

function ÍconeMagico({ id, type, position, innerRef }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    let currentX = position.x;
    let currentY = position.y;

    if (transform && isDragging) {
        currentX = Math.max(-window.innerWidth + 100, Math.min(20, position.x + transform.x));
        currentY = Math.max(-20, Math.min(window.innerHeight - 100, position.y + transform.y));
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
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing hover:brightness-110 drop-shadow-lg bg-[#91B09A] text-[#D0C697] dark:text-[#3B381E] ${isDragging ? '' : 'transition-transform duration-300 ease-out'}`}
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
            className={`absolute top-0 left-0 w-12 h-12 rounded-full border-[3px] transition-all duration-300 z-0 bg-[#91B09A]/10 backdrop-blur-sm pointer-events-auto ${
                isHovered
                    ? 'border-[#a4c5ae] bg-[#91B09A]/30 scale-110 shadow-[0_0_20px_rgba(164,197,174,0.6)]'
                    : 'border-dashed border-[#91B09A] shadow-[0_0_10px_rgba(145,176,154,0.2)] scale-100'
            }`}
        />
    );
}

export function ThemeToggle({ isDarkMode, onThemeChange, setAura }) {
    const [isHovered, setIsHovered] = useState(false);
    const inactiveIconRef = useRef(null);
    const circleRef = useRef(null);

    const [positions, setPositions] = useState({
        'light-mode': { x: 0, y: 0 },
        'dark-mode': { x: -70, y: 0 }
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

    useEffect(() => {
        let frameId;
        let lastX = null, lastY = null, lastVisible = null;

        const trackIcon = () => {
            if (inactiveIconRef.current && circleRef.current) {
                const iconRect = inactiveIconRef.current.getBoundingClientRect();
                const circleRect = circleRef.current.getBoundingClientRect();

                const iconX = iconRect.left + iconRect.width / 2;
                const iconY = iconRect.top + iconRect.height / 2;
                const circleX = circleRect.left + circleRect.width / 2;
                const circleY = circleRect.top + circleRect.height / 2;

                const distance = Math.hypot(iconX - circleX, iconY - circleY);
                const isVisible = distance > DISTANCE_THRESHOLD;

                if (iconX !== lastX || iconY !== lastY || isVisible !== lastVisible) {
                    setAura({
                        x: iconX + window.scrollX,
                        y: iconY + window.scrollY,
                        visible: isVisible
                    });
                    lastX = iconX;
                    lastY = iconY;
                    lastVisible = isVisible;
                }
            }
            frameId = requestAnimationFrame(trackIcon);
        };

        trackIcon();
        return () => cancelAnimationFrame(frameId);
    }, [setAura, isDarkMode, positions]);

    function handleDragMove(event) {
        const { active, delta } = event;
        const currentX = positions[active.id].x + delta.x;
        const currentY = positions[active.id].y + delta.y;
        setIsHovered(Math.hypot(currentX, currentY) < MAGNETIC_RADIUS);
    }

    function handleDragEnd(event) {
        const { active, delta } = event;
        const currentX = Math.max(-window.innerWidth + 100, Math.min(20, positions[active.id].x + delta.x));
        const currentY = Math.max(-20, Math.min(window.innerHeight - 100, positions[active.id].y + delta.y));

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
            setPositions(prev => ({
                ...prev,
                [active.id]: { x: currentX, y: currentY }
            }));
        }
    }

    return (
        <div className="fixed top-8 right-8 z-50 w-12 h-12 pointer-events-auto">
            <DndContext onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
                <CirculoReceptor isHovered={isHovered} innerRef={circleRef} />
                <ÍconeMagico
                    id="light-mode"
                    type="sun"
                    position={positions['light-mode']}
                    innerRef={isDarkMode ? inactiveIconRef : null}
                />
                <ÍconeMagico
                    id="dark-mode"
                    type="moon"
                    position={positions['dark-mode']}
                    innerRef={!isDarkMode ? inactiveIconRef : null}
                />
            </DndContext>
        </div>
    );
}
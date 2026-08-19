import { Text } from './Text';

const PLACEHOLDER_IMAGES = [1, 2, 3, 4, 5];
const CAROUSEL_ITEMS = [...PLACEHOLDER_IMAGES, ...PLACEHOLDER_IMAGES, ...PLACEHOLDER_IMAGES, ...PLACEHOLDER_IMAGES];

export function BackgroundCarousel({ language }) {
    return (
        <div className="absolute z-0 flex items-center w-full overflow-hidden pointer-events-none opacity-30 dark:opacity-20 left-1/2 -translate-x-1/2">

            <style>{`
                @keyframes scroll-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-scroll-right {
                    animation: scroll-right 60s linear infinite;
                    width: max-content;
                }
            `}</style>

            <div className="flex gap-8 animate-scroll-right">
                {CAROUSEL_ITEMS.map((item, index) => (
                    <div
                        key={index}
                        className="w-32 h-40 md:w-40 md:h-[200px] rounded-xl border-2 border-[#4F2B33]/50 dark:border-[#91B09A]/50 bg-[#4F2B33]/5 dark:bg-[#91B09A]/5 backdrop-blur-sm flex items-center justify-center shrink-0"
                    >
                        <Text variant="text" className="text-xl font-bold opacity-60">
                            {language === 'en' ? `Img ${item}` : `Img ${item}`}
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    );
}
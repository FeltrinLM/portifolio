import { Text } from '../components/Text';

export function About() {
    return (
        <div className="min-h-[90vh] pt-32 flex flex-col items-center justify-start gap-6">
            <Text variant="title" as="h1" className="text-5xl font-bold">
                Sobre Mim
            </Text>

            <Text variant="text" as="p" className="text-xl max-w-2xl text-center opacity-80">
                O seu conteúdo começará a ganhar vida aqui...
            </Text>
        </div>
    );
}
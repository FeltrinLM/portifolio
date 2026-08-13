export function Text({ variant, as, className = '', children }) {
    // A REGRA DE OURO: Se não disser o que é, o texto não existe.
    if (!variant || (variant !== 'title' && variant !== 'text')) {
        console.error("⚠️ SISTEMA BLOQUEADO: Você tentou escrever um texto sem definir se é 'title' ou 'text'.");
        return null; // Retorna um grande NADA para a tela
    }

    // Define as classes obrigatórias para cada variante
    const baseStyles = {
        // Título: Cormorant Garamond Regular (font-normal)
        title: "font-title font-normal tracking-wide",
        // Texto: Lato Light Italic (font-light italic)
        text: "font-text font-light italic tracking-wide"
    };

    // Se não passar uma tag (como h1 ou p), ele tenta ser inteligente
    const Component = as || (variant === 'title' ? 'h2' : 'p');

    return (
        <Component className={`${baseStyles[variant]} ${className}`}>
            {children}
        </Component>
    );
}
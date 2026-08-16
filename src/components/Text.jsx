export function Text({ variant, as, className = '', children }) {
    if (!variant || !['title', 'text'].includes(variant)) return null;

    const baseStyles = {
        title: "font-title font-normal tracking-wide",
        text: "font-text font-light italic tracking-wide"
    };

    const Component = as || (variant === 'title' ? 'h2' : 'p');

    return (
        <Component className={`${baseStyles[variant]} ${className}`}>
            {children}
        </Component>
    );
}
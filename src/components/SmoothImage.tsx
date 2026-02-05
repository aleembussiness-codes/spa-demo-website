

interface SmoothImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function SmoothImage({ src, alt, className = '' }: SmoothImageProps) {
    // Auto-optimize Pexels images
    const optimizedSrc = src.includes('pexels.com')
        ? `${src}?auto=compress&cs=tinysrgb&w=800`
        : src;

    return (
        <img
            src={optimizedSrc}
            alt={alt}
            className={`w-full h-full object-cover ${className}`}
            loading="lazy"
        />
    );
}

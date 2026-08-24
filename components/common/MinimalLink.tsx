import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

interface MinimalLinkProps {
    children?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    label?: string;
    href: string;
    /** Se passato, intercetta il click sinistro (preventDefault) al posto della navigazione a `href` — `href` resta comunque il fallback per apertura in nuova scheda / hover / SEO. */
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const MinimalLink: React.FC<MinimalLinkProps> = ({
    children,
    className = "",
    icon,
    iconPosition = 'right',
    label,
    href,
    onClick,
}) => {
    const defaultIcon = <MoveRight size={14} className="icon-altalenante inline-block" />;

    // Wrap custom icons in a span that carries the animation class
    const animClass = iconPosition === 'left' ? 'icon-altalenante-reverse translate-x-0' : 'icon-altalenante translate-x-0';
    const displayIcon = icon
        ? <span className={animClass + ' inline-block'}>{icon}</span>
        : defaultIcon;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`group hidden lg:inline-flex flex-row items-center gap-1.5 font-x-typewriter text-sm font-bold uppercase tracking-wider transition-colors ${className}`}
        >
            {iconPosition === 'left' && displayIcon}
            {children || label}
            {iconPosition === 'right' && displayIcon}
        </Link>
    );
};

export default MinimalLink;

import { twMerge } from 'tailwind-merge';
import { dynamicTextStyle } from '@/lib/dynamicStyle';
import { renderMarkdown, type MarkdownClasses } from '@/lib/markdown';

interface MarkdownProps {
    content: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    align?: 'left' | 'center' | 'right' | 'justify';
    className?: string;
    colorClassName?: string;
    classes?: Partial<MarkdownClasses>;
}

// Render di un blocco Markdown già convertito in HTML con classi Tailwind
// statiche (vedi lib/markdown.ts). Il colore arriva dal color picker admin
// come stringa dinamica: risolto via CSS var + .dyn-text sul contenitore, e
// ereditato da tutti i figli generati (heading, li, strong, ...), che infatti
// non portano nessuna classe di colore propria.
const Markdown = ({
    content,
    size = 'md',
    align = 'left',
    className = '',
    colorClassName = '',
    classes,
}: MarkdownProps) => {
    const sizeMap = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
    };

    const alignMap = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
    };

    const html = renderMarkdown(content ?? '', classes ? { classes } : undefined);
    const hasDynamicColor = Boolean(colorClassName);

    return (
        <div className={twMerge('relative w-full')}>
            <div
                style={dynamicTextStyle(colorClassName)}
                className={twMerge(
                    sizeMap[size],
                    alignMap[align],
                    hasDynamicColor && 'dyn-text',
                    className
                )}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
};

export default Markdown;

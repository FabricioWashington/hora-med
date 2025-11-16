import { ReactNode } from 'react';

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'sm' | 'md' | 'lg' | 'none';
}

export function PageWrapper({
    children,
    className = '',
    maxWidth = 'full',
    padding = 'md'
}: PageWrapperProps) {
    const getMaxWidthClass = () => {
        switch (maxWidth) {
            case 'sm': return 'max-w-screen-sm';
            case 'md': return 'max-w-screen-md';
            case 'lg': return 'max-w-screen-lg';
            case 'xl': return 'max-w-screen-xl';
            case '2xl': return 'max-w-screen-2xl';
            case 'full': return 'max-w-full';
            default: return 'max-w-full';
        }
    };

    const getPaddingClass = () => {
        switch (padding) {
            case 'none': return '';
            case 'sm': return 'p-2 px-0';
            case 'md': return 'p-8 px-4';
            case 'lg': return 'p-10 px-5';
            default: return 'p-6 px-3';
        }
    };

    return (
        <div className={`
            min-h-full
            ${getMaxWidthClass()}
            ${getPaddingClass()}
            mx-2 lg:mx-2
            ${className}
        `}>
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    );
}

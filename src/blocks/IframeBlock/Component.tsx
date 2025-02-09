import React from 'react';
import { cn } from '@/utilities/ui';

export const IframeBlock: React.FC<{
    iframeCode: string; // El código HTML del iframe
    size?: 'full' | 'half' | 'oneThird' | 'twoThirds';
}> = ({ iframeCode, size = 'full' }) => {
    if (!iframeCode) return null; // Si no hay contenido, no renderiza nada.

    // Mapeo de clases para las columnas
    const colsSpanClasses = {
        full: '12',
        half: '6',
        oneThird: '4',
        twoThirds: '8',
    };

    return (
        <div className="container">
            <div
                className={cn(
                    `flex flex-col gap-4`,
                    `col-span-4 lg:col-span-${colsSpanClasses[size]}`
                )}
            >
                {/* Renderizamos el iframe proporcionado */}
                <div
                    className="iframe-content"
                    dangerouslySetInnerHTML={{ __html: iframeCode }}
                />
            </div>
        </div>
    );
};

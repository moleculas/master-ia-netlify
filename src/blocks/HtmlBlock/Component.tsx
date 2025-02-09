import React from 'react';
import { cn } from '@/utilities/ui';

import type { HtmlBlock as HtmlBlockProps } from '@/payload-types'; // Asegúrate de que HtmlBlock esté en payload-types

export const HtmlBlock: React.FC<HtmlBlockProps & { className?: string }> = ({
    html,
    size = 'full',
    className,
}) => {
    // Mapeo de clases para las columnas
    const colsSpanClasses = {
        full: '12',
        half: '6',
        oneThird: '4',
        twoThirds: '8',
    };

    // Asegurarse de que size tiene un valor válido
    const validSize = size && colsSpanClasses[size] ? size : 'full';

    return (
        <div className={cn('container', className)}>
            <div
                className={cn(
                    `flex flex-col gap-4`,
                    `col-span-4 lg:col-span-${colsSpanClasses[validSize]}`
                )}
            >
                {/* Renderizamos el HTML proporcionado */}
                <div
                    className="html-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
};

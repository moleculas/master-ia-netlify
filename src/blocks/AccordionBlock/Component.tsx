"use client";

import React, { useState } from 'react';
import type { AccordionBlock as AccordionBlockProps } from 'src/payload-types';
import { cn } from '@/utilities/ui';
import RichText from '@/components/RichText'

type Props = {
    className?: string;
} & AccordionBlockProps;


export const AccordionBlock: React.FC<Props> = ({ className, title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log(content)
    return (
        <div className={cn('accordion mx-auto my-4 w-full', className)}>
            <button
                className={cn(
                    "accordion-header w-full px-4 py-2 text-left font-bold",
                    "border border-gray-300 bg-gray-100 hover:bg-gray-200",
                    isOpen ? "rounded-t rounded-b-none" : "rounded"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
            </button>
            {isOpen && (
                <div className="accordion-content px-4 py-2 border-l border-r border-b border-gray-300 bg-white rounded-b-none">
                    <RichText data={content} enableGutter={false} enableProse={false} />
                </div>
            )}
        </div>
    );
};
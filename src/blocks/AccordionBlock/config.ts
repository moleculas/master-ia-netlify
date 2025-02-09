import type { Block } from 'payload';

import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const AccordionBlock: Block = {
    slug: 'accordion',
    labels: {
        singular: 'Accordion',
        plural: 'Accordions',
    },
    fields: [
        {
            name: 'title',
            label: 'Título',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            label: 'Contenido',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                    return [...defaultFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
                },
            }),
            required: true,
        },
    ],
    interfaceName: 'AccordionBlock',
};

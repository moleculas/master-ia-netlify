import type { Block } from 'payload';

import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const TabsBlock: Block = {
    slug: 'tabs',
    labels: {
        singular: 'Tabs',
        plural: 'Tabs',
    },
    fields: [
        {
            name: 'tabs',
            label: 'Pestañas',
            type: 'array',
            minRows: 2, // Al menos 2 pestañas
            required: true,
            fields: [
                {
                    name: 'label',
                    label: 'Etiqueta',
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
        },
    ],
    interfaceName: 'TabsBlock',
};

export default TabsBlock;

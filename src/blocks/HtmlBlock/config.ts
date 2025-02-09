import type { Block } from 'payload';

export const HtmlBlock: Block = {
    slug: 'htmlBlock',
    labels: {
        singular: 'HTML Block',
        plural: 'HTML Blocks',
    },
    fields: [
        {
            name: 'size',
            label: 'Size',
            type: 'select',
            defaultValue: 'full',
            options: [
                { label: 'One Third', value: 'oneThird' },
                { label: 'Half', value: 'half' },
                { label: 'Two Thirds', value: 'twoThirds' },
                { label: 'Full', value: 'full' },
            ],
        },
        {
            name: 'html',
            label: 'HTML',
            type: 'code',
            required: true,
            admin: {
                language: 'html',
            },
        },

    ],
    interfaceName: 'HtmlBlock',
};

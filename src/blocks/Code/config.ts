import type { Block } from 'payload';

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        { label: 'Typescript', value: 'typescript' },
        { label: 'Javascript', value: 'javascript' },
        { label: 'CSS', value: 'css' },
        { label: 'JSON', value: 'json' },
        { label: 'Plain Text', value: 'plaintext' },
        { label: 'Markdown', value: 'markdown' },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
      admin: {
        language: 'typescript', // Lenguaje por defecto
        editorOptions: {
          lineNumbers: true,
          mode: {
            name: 'javascript',
            typescript: true
          }
        }
      }
    },
  ],
};
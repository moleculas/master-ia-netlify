import type { GlobalConfig } from 'payload';

import { link } from '@/fields/link';
import { revalidateHeader } from './hooks/revalidateHeader';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Nav Items',
      type: 'array',
      maxRows: 10, // Permitir hasta 10 elementos, asegúrate de que no sea 0
      minRows: 0, // Permitir que empiece vacío
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'subItems',
          label: 'Sub Items',
          type: 'array',
          admin: {
            initCollapsed: true,
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};

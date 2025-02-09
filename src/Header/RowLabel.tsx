'use client';

import { Header } from '@/payload-types';
import { RowLabelProps, useRowLabel } from '@payloadcms/ui';

export const RowLabel: React.FC<RowLabelProps> = (props) => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>();

  const label = data?.data?.link?.label
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : 'Row';

  // Verificar que subItems esté definido antes de acceder a length
  const hasSubItems = Array.isArray(data?.data?.subItems) && data?.data?.subItems.length > 0;

  return (
    <div>
      {label}
      {hasSubItems && ` (Has ${data?.data?.subItems?.length} sub-item(s))`}
    </div>
  );
};

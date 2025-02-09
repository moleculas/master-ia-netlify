import React from 'react';
import { cn } from '@/utilities/ui';
import { Code } from './Component.client';

export type CodeBlockProps = {
  code: string;
  language?: string;
  blockType: 'code';
  size?: 'full' | 'half' | 'oneThird' | 'twoThirds';
};

type Props = CodeBlockProps & {
  className?: string;
};

export const CodeBlock: React.FC<Props> = ({ className, code, language, size = 'full' }) => {
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
        <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
          <Code code={code} language={language} />
        </div>
      </div>
    </div>
  );
};

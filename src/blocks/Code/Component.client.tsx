'use client'
import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'
import { CopyButton } from './CopyButton'

type Props = {
  code: string
  language?: string
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
  if (!code) return null

  const normalizedLanguage = language.toLowerCase() || 'plaintext';
  const isMarkdown = normalizedLanguage === 'markdown';

  return (
    <Highlight
      code={code}
      language={normalizedLanguage}
      theme={isMarkdown ? undefined : themes.vsDark}
    >
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre
          className={`p-4 border text-xs rounded ${isMarkdown
            ? 'bg-gray-200 text-black border-gray-300 whitespace-pre-wrap break-words'
            : 'bg-black text-white border-border overflow-x-auto'
            }`}
          style={{
            backgroundColor: isMarkdown ? '#f5f5f5' : undefined,
            color: isMarkdown ? '#000' : undefined,
            borderColor: isMarkdown ? '#d1d5db' : undefined,
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ className: 'table-row', line })}>
              {!isMarkdown && (
                <span className="table-cell select-none text-right text-white/25">
                  {i + 1}
                </span>
              )}
              <span className="table-cell pl-4">
                {line.map((token, key) => (
                  <span
                    key={key}
                    {...getTokenProps({ token })}
                    style={isMarkdown ? { color: '#000' } : undefined}
                  />
                ))}
              </span>
            </div>
          ))}
          <CopyButton code={code} />
        </pre>
      )}
    </Highlight>
  )
}

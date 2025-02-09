import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('border py-3 px-6 flex items-center rounded', {
          'border-[#b8daff] bg-[#cce5ff] text-sm': style === 'info',
          'border-error bg-error/30 text-sm': style === 'error',
          'border-success bg-success/30 text-sm': style === 'success',
          'border-warning bg-warning/30 text-sm': style === 'warning',
          'border-[#FFFB88] bg-[#fffdd7] text-sm': style === 'resumen',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}

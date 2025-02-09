import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ResumenBlockProps } from '@/payload-types'

export const ResumenBlock: React.FC<ResumenBlockProps> = (props) => {
    const { columns } = props

    const colsSpanClasses = {
        full: '12',
        half: '6',
        oneThird: '4',
        twoThirds: '8',
    }

    return (
        <div className="container my-16">
            <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
                {columns &&
                    columns.length > 0 &&
                    columns.map((col, index) => {
                        const { richText, size } = col

                        return (
                            <div
                                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                                    'md:col-span-2': size !== 'full',
                                })}
                                key={index}
                            >
                                <div
                                    className="p-4 border text-xs rounded overflow-x-auto bg-[#fffdd7] border-[#FFFB88]"
                                >
                                    {richText && <RichText className="text-sm text-[#710909]" data={richText} enableGutter={false} />}
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
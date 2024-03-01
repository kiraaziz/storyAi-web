import { LoaderIcon } from 'lucide-react'
import React from 'react'

export default function Loading() {
    return (
        <div className='flex-1 w-full flex items-center justify-center gap-3'>
            <LoaderIcon className='animate-spin' />
            Loading ...
        </div>
    )
}

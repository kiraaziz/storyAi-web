import { Telescope } from 'lucide-react'
import React from 'react'

function page() {
    return (
        <div className='h-full w-full p-7 lg:py-16 mx-auto max-w-4xl'>
            <h1 className='text-2xl items-center justify-center w-max backdrop-blur-sm p-1 border border-input font-semibold flex gap-6'>
                <Telescope size={40} />
                Create New Story
            </h1>
            <div className='grid gap-2'>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default page
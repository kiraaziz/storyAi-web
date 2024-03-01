"use client"
import { Telescope } from 'lucide-react'
import { userProfile } from "@/hooks/user"


function page() {

    const { profile } = userProfile()

    return (
        <div className='h-full w-full p-7 lg:py-16 mx-auto max-w-4xl'>
            <h1 className='text-2xl items-center justify-center w-max backdrop-blur-sm p-1 border border-input font-semibold flex gap-6'>
                <Telescope size={40} />
                Create New Story
            </h1>
            <div className='grid gap-2'>
                <div>
                    {JSON.stringify(profile)}
                </div>
            </div>
        </div>
    )
}

export default page
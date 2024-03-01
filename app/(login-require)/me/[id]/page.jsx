import BookPages from '@/components/BookPages'
import { firestore } from '@/lib/firebase/connection'
import { doc, getDoc } from 'firebase/firestore'
import React from 'react'

async function page({ params }) {

    const data = await (await getDoc(doc(firestore, "books", params.id))).data()

    return (
        <div className='lg:p-8 p-5 w-full'>
            <div className='w-full max-w-xl  mx-auto p-2 overflow-clip h-max'>
                <BookPages data={data.book.story.scenes} />
            </div>
        </div>
    )
}

export default page
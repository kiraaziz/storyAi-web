"use client"
import { firestore } from '@/lib/firebase/connection'
import { useEffect, useState } from 'react'
import { collection, getCountFromServer, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { userProfile } from '@/hooks/user'
import { AlertTriangle, Book, Plus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Loading from '@/components/root/Loading'


function page() {

    const [postList, setPostList] = useState([])
    const [loadingState, setLoadingState] = useState(true)
    const { profile } = userProfile()
    const [count, setCount] = useState(1)
    const [last, setLast] = useState(null)

    const loadData = async () => {

        setLoadingState(true)

        let myData = await getDocs(query(collection(firestore, "books")), where("user", "==", profile?.uid), orderBy("createAt", "desc"), limit(25))


        setPostList((pre) => {

            let newList = []
            myData.forEach((val) => {
                let newOne = { id: val.id, data: val.data() }
                newList.push(newOne)
            })

            return newList

        })

        setLoadingState(false)
    }

    var ranonce = false;
    useEffect(() => {
        if (!ranonce) {
            loadData()
            ranonce = true
        }

    }, [])

    // const loadMore = async () => {

    //     try {
    //         let myData
    //         myData = await getDocs(query(collection(firestore, "books"), where("user", "==", profile?.uid), orderBy("createAt", "desc"), limit(5), startAfter(last)))

    //         setLast(myData.docs[4])

    //         setPostList((pre) => {

    //             let newList = []
    //             myData.forEach((val) => {
    //                 let newOne = { id: val.id, data: val.data() }
    //                 newList.push(newOne)
    //             })

    //             return [...pre, ...newList]

    //         })
    //     } catch (e) {

    //     }

    //     setLoadingState(false)
    // }

    // const handleScroll = () => {
    //     const container = document.querySelector('.scroller')
    //     if (container) {
    //         const scrollPosition = container.scrollTop + container.clientHeight
    //         const totalHeight = container.scrollHeight

    //         if (scrollPosition >= totalHeight - 100) {
    //             if (!loadingState && postList.length < 100) {
    //                 setLoadingState(true)
    //                 loadMore()
    //             }
    //         }
    //     }
    // };onScroll={handleScroll}


    return (
        <div className=' h-full overflow-auto w-full scroller lg:p-10 p-5'  >
            <div className='w-full max-w-5xl p-2 grid grid-cols-1 lg:grid-cols-1 mx-auto gap-2'>
                <div className='col-span-full flex items-center justify-between mb-3'>
                    <h1 className='flex items-center justify-between gap-3 text-xl font-bold'>
                        <Sparkles className='text-primary' size={24} />
                        Your stories
                    </h1>
                    <Link href="/write">
                        <Button className="gap-2" variant="outline">
                            New
                            <Plus size={17} />
                        </Button>
                    </Link>
                </div>
                {loadingState ? <div className='h-96 flex items-center justify-center backdrop-blur-md'>
                    <Loading />
                </div>
                    : postList.length === 0 ? <div className='h-96 flex items-center justify-center flex-col text-xl backdrop-blur-md'>
                        <AlertTriangle className='text-primary' size={35} />
                        No Story created yet
                        <Link href="/write" className='mt-5'>
                            <Button className="gap-2" variant="outline">
                                Create your first story
                                <Plus size={17} />
                            </Button>
                        </Link>
                    </div>
                        : postList.map((v) => (
                            <div className='px-5 pb-5 mx-auto max-w-3xl w-full '>
                                <div className='w-full flex  gap-3 lg:flex-row flex-col'>
                                    <div className='h-48 w-48 bg-white rounded shadow-md'>
                                    </div>
                                    <div className='flex-1 flex items-start justify-center flex-col'>
                                        <h1 className='mb-1 text-xl font-semibold backdrop-blur-md'>
                                            {v.data.book.story.title}
                                        </h1>
                                        <p className='max-w-xl  text-foreground/70 backdrop-blur-md'>
                                            {v.data.book.story.description}
                                        </p>
                                        <div className='flex items-end w-full mt-5 justify-end lg:px-10'>
                                            <Link href={`/me/${v.id}`}>
                                                <Button className="gap-3 rounded-full">
                                                    <Book size={17} />
                                                    Read
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-5 w-1/2 border-b-2 rounded-full border-primary mx-auto' />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default page
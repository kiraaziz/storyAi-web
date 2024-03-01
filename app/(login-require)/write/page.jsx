"use client"
import { CheckCheck, Loader, Plus, Sparkle, Telescope } from 'lucide-react'
import { userProfile } from "@/hooks/user"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { genres as G } from "./Genre"
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { addDoc, collection } from 'firebase/firestore'
import { firestore } from "@/lib/firebase/connection"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function Page() {

    const { profile } = userProfile()

    const [genres, setGenres] = useState(G)
    const [selectedGenres, setSelectedGenres] = useState([])
    const [loader, setLoader] = useState(false)
    const router = useRouter()

    const toggleGenre = (genre) => {
        const isSelected = selectedGenres.includes(genre);
        if (isSelected) {
            setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    }

    const [newGenre, setNewGenre] = useState("")
    const addGenre = () => {

        setGenres([newGenre, ...genres])
        setSelectedGenres([newGenre, ...selectedGenres])

        setNewGenre("")
    }

    const [bookData, setBookData] = useState({
        name: "",
        about: "",
        count: 5
    })
    const setBookF = (f, e) => {
        setBookData((prevData) => {
            return {
                ...prevData,
                [f]: e,
            };
        });
    };

    const generate = async () => {

        if (!bookData.name || !bookData.about) {
            
            toast.error("Some fields are currently blank.")
        } else {
            setLoader(true)
            const data = {
                ...bookData,
                selectedGenres
            }

            const AiResponseReq = await fetch("/api/write", {
                method: "Post",
                body: JSON.stringify(data)
            })

            const AiResponse = await AiResponseReq.json()

            const fireData = {
                userId: profile.uid,
                name: bookData.name,
                book: AiResponse,
                likes: 0,
                likeUsers: [],
                createdAt: Date.now(),
                isPublic: true
            }

            const { id } = await addDoc(collection(firestore, "books"), fireData)
            router.push(`me/${id}`)

            setLoader(false)
        }
    }

    return (
        <div className='h-full w-full p-7 lg:py-16 mx-auto max-w-4xl space-y-4'>
            <h1 className='text-2xl items-center justify-center w-max font-semibold flex gap-6'>
                <Telescope size={40} />
                Create New Story
            </h1>
            <div className='grid gap-5 backdrop-blur-sm p-3'>
                <div className=''>
                    <Label className="text-lg font-light">Name</Label>
                    <Input value={bookData.name} onChange={(e) => setBookF("name", e.target.value)} placeholder="The lengend of kira" />
                </div>
                <div className=''>
                    <Label className="text-lg font-light">Story</Label>
                    <Textarea value={bookData.about} onChange={(e) => setBookF("about", e.target.value)} placeholder="a stroy about the king kira " />
                </div>
                <div className=''>
                    <Label className="text-lg font-light">Pages
                        <span className='text-primary font-semibold mx-1'>({bookData.count})</span>
                    </Label>
                    <Slider onValueChange={(e) => setBookF("count", e[0])} className="mt-2" defaultValue={[bookData.count]} min={1} max={12} step={1} />
                </div>
                <div className=''>
                    <div className='flex gap-2 items-center justify-between mb-4 w-full'>
                        <Label className="text-lg font-light">Genre</Label>
                        <div className="flex">
                            <Input
                                type="text"
                                placeholder="Add genre..."
                                value={newGenre}
                                onChange={(e) => setNewGenre(e.target.value)}
                            />
                            <Button
                                disabled={!newGenre}
                                onClick={addGenre}
                            >
                                <Plus size={15} />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">

                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => toggleGenre(genre)}
                                className={`backdrop-blur-2xl px-3 py-1 rounded-full flex gap-2 items-center justify-center h-max ${selectedGenres.includes(genre) ? 'bg-primary' : 'bg-primary/70'
                                    }`}
                            >
                                {selectedGenres.includes(genre) && <CheckCheck size={16} />}
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='w-full flex items-center justify-end pt-5'>
                    {loader ? <Button size="icon" className="rounded-full" disabled>
                        <Loader className='animate-spin' size={16} />
                    </Button>
                        : <Button onClick={generate} className="gap-2 px-4 rounded-full">
                            <Sparkle />
                            Generate
                        </Button>}
                </div>
            </div>
        </div>
    )
}

export default Page
"use client"
import { storage } from "@/lib/firebase/connection"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useEffect, useState } from "react"
import HTMLFlipBook from "react-pageflip"
import { Button } from "./ui/button"

function BookPages({ data }) {

    const [pages, setPages] = useState(data)

    return (
        <>
            {pages.map((p, i) => (
                <div key={i} className="w-full">
                    <div className=" border p-5 flex flex-col  backdrop-blur-sm gap-4 justify-between ">
                        <h1 className="text-primary font-bold text-xl tracking-wide">{p.script}</h1>
                        <div onClick={() => load(i)} className="h-60 w-full flex items-center justify-center rounded shadow mb-5">
                            <img src={p.prompt} className="h-60 w-60 mx-auto" />
                        </div>
                        <div className="flex-1" />
                        <p className="text-foreground/70">{p.content}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default BookPages
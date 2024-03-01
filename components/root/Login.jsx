import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { FaGithub, FaGoogle } from "react-icons/fa"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from "@/lib/firebase/connection"

function Login() {

    const googleProvider = new GoogleAuthProvider()


    const login = async () => {
        signInWithPopup(auth, googleProvider)
    }

    return (
        <div className='flex-1 w-full  flex'>
            <div className='flex-1 h-full lg:flex hidden overflow-hidden'>
                <div className='h-full w-full loginLayout bg-white p-9 flex items-start justify-center flex-col'>
                    <div className='flex-1 flex justify-center flex-col'>
                        <h1 className='text-lg px-4 my-3 text-foreground py-1 bg-primary w-max'>Story Ai</h1>
                        <p className='text-3xl font-medium max-w-md text-white'>Turn your idea into mind bloing story in seconds </p>
                    </div>
                    <div className='py-5 flex items-end justify-end w-full'>
                        <h1 className='backdrop-blur text-white'>
                            This app created by
                            <Link className='text-primary underline mx-1' href="https://kiraaziz.vercel.app">kira</Link>
                        </h1>
                    </div>
                </div>

            </div>
            <div className='flex-[1.5] h-full flex items-center justify-center flex-col gap-2'>
                <h1 className='text-4xl tracking-wide font-extrabold mb-5'>Join our team</h1>
                <Button onClick={login} variant="outline" className="w-1/2 h-12 gap-4">
                    <FaGoogle size={20} />
                    Google
                </Button>
                <Button variant="outline" className="w-1/2 h-12 gap-4">
                    <FaGithub size={20} />
                    Github
                </Button>
            </div>
        </div>
    )
}

export default Login
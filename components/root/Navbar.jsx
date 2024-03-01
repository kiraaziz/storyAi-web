"use client"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase/connection"
import { Loader, Scroll } from "lucide-react"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "firebase/auth"
import ThemeSwitch from "@/components/ui/themeSwitch"

function Navbar() {

    const [user, loading, error] = useAuthState(auth)

    return (
        <div className="h-[14svh] py-5 backdrop-blur-xl sticky top-0 border-b px-5 lg:px-0 z-50">
            <div className="h-full w-full flex items-center justify-between max-w-6xl mx-auto">
                <h1 className="flex gap-3 text-primary font-bold text-lg">
                    <Scroll />
                    Story Ai
                </h1>
                <div className="flex items-center justify-center gap-2">
                    <ThemeSwitch />
                    <Link href="/me">
                        {loading ?
                            <Button size="icon">
                                <Loader size={17} className="animate-spin" />
                            </Button> :
                            !user ? <Button>Login</Button> : null
                        }
                    </Link>
                    {user && <button onClick={() => signOut(auth)}>
                        <Avatar>
                            <AvatarImage src={user?.photoURL} className="object-cover" />
                            <AvatarFallback>{user?.displayName?.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default Navbar
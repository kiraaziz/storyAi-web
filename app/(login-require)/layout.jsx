"use client"
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/lib/firebase/connection"
import Loading from '@/components/root/Loading';
import Login from '@/components/root/Login';
import { useLogin } from '@/hooks/useLogin';
import { userProfile } from "@/hooks/user"

const useFirebaseUser = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)
    const [registerLoad, setRegisterLoad] = useState(false)

    const { setProfile } = userProfile()

    useEffect(() => {
        setRegisterLoad(true)
        const fetchUserData = async () => {
            if (user) {

                const fromFire = await useLogin(user)
                setProfile(fromFire)
            }
        }

        fetchUserData()
        setRegisterLoad(false)
    }, [user])


    // if (loading || registerLoad) {
    //     return <Loading />
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    // if (!user) {
    //     return <Login />
    // }

    return children
}

export default useFirebaseUser
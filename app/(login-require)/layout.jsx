"use client"
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/lib/firebase/connection"
import Loading from '@/components/root/Loading';
import Login from '@/components/root/Login';
import { useLogin } from '@/hooks/useLogin';
import { userProfile } from "@/hooks/user"

const Layout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [registerLoad, setRegisterLoad] = useState(false);

    const { setProfile } = userProfile();

    // Move useLogin hook outside of fetchUserData
    const fromFire = useLogin(user);

    const fetchUserData = async () => {
        if (user) {
            setProfile(fromFire);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setRegisterLoad(true);
            await fetchUserData();
            setRegisterLoad(false);
        };

        fetchData();
    }, [user]);

    if (loading || registerLoad) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!user) {
        return <Login />;
    }

    return children;
};

export default Layout;
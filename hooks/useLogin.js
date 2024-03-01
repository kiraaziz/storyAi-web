import { firestore } from "@/lib/firebase/connection"
import { doc, getDoc, setDoc } from "firebase/firestore"

export const useLogin = async (currenUser) => {

    const profileData = {
        uid: currenUser.uid,
        displayName: currenUser.displayName,
        email: currenUser.email,
        photoURL: currenUser.photoURL,
    }

    const profileFromServer = await getDoc(doc(firestore, "profiles", profileData.uid))

    if (!profileFromServer.exists()) {
        await setDoc(doc(firestore, "profiles", profileData.uid), profileData)
    }

    return profileData
}
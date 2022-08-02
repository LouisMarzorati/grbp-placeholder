import { auth, firestore } from '@/lib/firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
export function useUser() {
  const [user, loading, error] = useAuthState(auth)
  const [userDetails, setUserDetails] = useState(null)
  useEffect(() => {
    let unsubscribe

    if (loading) {
      return
    }
    if (user) {
      const ref = firestore.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        setUserDetails({
          ...doc.data(),
        })
      })
    } else {
      setUserDetails(null)
    }

    return unsubscribe
  }, [user])

  return {
    user: user?.uid ? { uid: user.uid, ...userDetails } : null,
    userLoading: loading,
    userError: error,
  }
}

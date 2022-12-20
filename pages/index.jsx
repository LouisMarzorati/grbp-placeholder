import { useContext, useEffect, useState } from 'react'
import Loader from '@/components/elements/Loader'
import { UserContext } from 'lib/user-context'
import CreatePost from 'components/CreatePost'
import { firestore } from 'lib/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import toast from 'react-hot-toast'
import Post from 'components/Post'
export default function Home() {
  const { user } = useContext(UserContext)
  const [posts, setPosts] = useState([])
  const [userError, setUserError] = useState(false)
  const ref = firestore.collection('posts').orderBy('createdAt', 'desc')
  const [value, loading, error] = useCollection(ref)

  useEffect(() => {
    if (user?.uid) {
      setUserError(false)
      return
    }

    if (!user?.userLoading && !user?.uid) {
      setUserError(true)
    }
  }, [user])

  useEffect(() => {
    if (loading) {
      return
    }

    if (error) {
      toast.error('Error loading posts')
    }
    if (value) {
      setPosts(value.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
  }, [value])

  if (loading) {
    return <Loader />
  }

  if (userError || (!user?.userLoading && !user?.uid)) {
    return <div>Login to view</div>
  }

  return (
    <div className='flex flex-col gap-y-6 w-full'>
      <div className='flex flex-col justify-center items-center gap-y-4'>
        <CreatePost />
        {posts?.length > 0 &&
          posts.map((post) => <Post post={post} key={post.id} />)}
      </div>
    </div>
  )
}

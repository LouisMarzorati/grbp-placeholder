import { useContext, useEffect, useState } from 'react'
import { getRecentPosts } from '@/lib/db'
import Loader from '@/components/elements/Loader'
import { UserContext } from 'lib/user-context'
export default function Home() {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [userError, setUserError] = useState(false)
  useEffect(() => {
    console.log('user', user)
    if (user?.uid) {
      setLoading(false)
      setUserError(false)
      getRecentPostsForHome()
      return
    }

    if (!user?.userLoading && !user?.uid) {
      setLoading(false)
      setUserError(true)
    }
  }, [user])

  const getRecentPostsForHome = async () => {
    const posts = await getRecentPosts()
    console.dir(posts)
    setPosts(posts)
    setLoading(false)
  }

  if (loading) {
    return <Loader />
  }

  if (userError) {
    return <div>User not found lol</div>
  }

  return (
    <div>
      <div>Welcome</div>
      {posts?.length > 0 &&
        posts.map((post) => (
          <div key={post.id}>
            {post.ownerName} says: {post.content}
          </div>
        ))}
    </div>
  )
}

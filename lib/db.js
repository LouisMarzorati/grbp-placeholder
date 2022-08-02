import { firestore } from '@/lib/firebase'

export async function getRecentPosts() {
  const posts = await firestore.collection('posts').get()
  return posts.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
}

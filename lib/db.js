import { firestore } from '@/lib/firebase'
import { serverTimestamp } from './firebase'

export async function getRecentPosts() {
  const posts = await firestore.collection('posts').get()
  return posts.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
}

export async function createPost(owner, username, content) {
  const post = {
    content,
    owner,
    username,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  await firestore.collection('posts').add(post)
}

export async function updatePost(id, content) {
  await firestore.collection('posts').doc(id).update({
    content,
    updatedAt: serverTimestamp(),
  })
}

export async function deletePost(id) {
  await firestore.collection('posts').doc(id).delete()
}

export async function updateUsername(id, username) {
  await firestore.collection('users').doc(id).update({
    username,
    updatedAt: serverTimestamp(),
  })
}

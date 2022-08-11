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

export async function updatePhoneNumber(userId, phone) {
  try {
    await firestore.collection('users').doc(userId).update({
      phone,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    return false
  }
}

export async function deletePost(id) {
  await firestore.collection('posts').doc(id).delete()
}

export async function updateUsername(id, newUsername, oldUsername) {
  try {
    const batch = firestore.batch()
    const newUsernameDoc = firestore.collection('usernames').doc(newUsername)
    const userDoc = firestore.collection('users').doc(id)
    const oldUsernameDoc = firestore.collection('usernames').doc(oldUsername)

    batch.set(newUsernameDoc, {
      uid: id,
    })

    batch.delete(oldUsernameDoc)

    batch.update(userDoc, {
      username: newUsername,
      updatedAt: serverTimestamp(),
    })

    await firestore
      .collection('posts')
      .where('owner', '==', id)
      .get()
      .then(async (posts) => {
        await Promise.all(
          posts.docs.map(async (doc) => {
            await firestore.collection('posts').doc(doc.id).update({
              username: newUsername,
            })
          })
        )
      })
      .catch(console.error)

    await batch.commit()

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

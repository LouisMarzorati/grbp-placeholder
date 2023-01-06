import { firestore, storage } from '@/lib/firebase'
import { serverTimestamp } from './firebase'

export async function getRecentPosts() {
  const posts = await firestore.collection('posts').get()
  return posts.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
}

export async function createPost(owner, username, content, photoURL) {
  const post = {
    content,
    owner,
    username,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    photoURL: photoURL ?? '',
  }
  await firestore.collection('posts').add(post)
}

export async function getAllUsernames() {
  const usernames = await firestore.collection('usernames').get()
  return usernames.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
}

export async function uploadProfilePicture(userId, file) {
  const batch = firestore.batch()

  const ref = firestore.collection('users').doc(userId)
  const storageRef = storage.ref()
  //check if user has a profile picture
  const user = await ref.get()
  if (user.data().photoURL) {
    //delete old profile picture
    const oldProfilePictureRef = storage.refFromURL(user.data().photoURL)
    await oldProfilePictureRef.delete()
  }

  const fileRef = storageRef.child(`${userId}-${file.name}`)
  await fileRef.put(file)
  const url = await fileRef.getDownloadURL()
  await ref.update({
    photoURL: url,
    updatedAt: serverTimestamp(),
  })

  await firestore
    .collection('posts')
    .where('owner', '==', userId)
    .get()
    .then(async (posts) => {
      await Promise.all(
        posts.docs.map(async (doc) => {
          await firestore.collection('posts').doc(doc.id).update({
            photoURL: url,
          })
        })
      )
    })
    .catch(console.error)

  await batch.commit()
}

export async function createReply(
  username,
  owner,
  postId,
  content,
  parentId = null,
  photoURL
) {
  try {
    const reply = {
      content,
      owner,
      username,
      parentId,
      photoURL: photoURL ?? '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    await firestore
      .collection('posts')
      .doc(postId)
      .collection('replies')
      .add(reply)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export async function updateReply(postId, id, content) {
  await firestore
    .collection('posts')
    .doc(postId)
    .collection('replies')
    .doc(id)
    .update({
      content,
      updatedAt: serverTimestamp(),
    })
}

export async function deleteReply(postId, id) {
  try {
    console.log(postId, id)
    await firestore
      .collection('posts')
      .doc(postId)
      .collection('replies')
      .doc(id)
      .delete()
  } catch (error) {
    console.error(error)
  }
}
export async function createComment(
  username,
  owner,
  postId,
  replyId,
  content,
  parentId = null,
  photoURL
) {
  try {
    const reply = {
      content,
      owner,
      username,
      parentId,
      replyId,
      photoURL: photoURL ?? '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    await firestore
      .collection('posts')
      .doc(postId)
      .collection('replies')
      .doc(replyId)
      .add(reply)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export async function updateComment(postId, replyId, id, content) {
  await firestore
    .collection('posts')
    .doc(postId)
    .collection('replies')
    .doc(replyId)
    .collection('comments')
    .doc(id)
    .update({
      content,
      updatedAt: serverTimestamp(),
    })
}

export async function deleteComment(postId, replyId, id) {
  try {
    await firestore
      .collection('posts')
      .doc(postId)
      .collection('replies')
      .doc(replyId)
      .collection('comments')
      .doc(id)
      .delete()
  } catch (error) {
    console.error(error)
  }
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

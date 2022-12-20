import { useContext, useEffect, useState } from 'react'

import { UserContext } from 'lib/user-context'
import Button from './elements/buttons/Button'
import { createPost } from 'lib/db'
import ContentLabel from './ContentLabel'
import { motion, AnimatePresence } from 'framer-motion'
export default function CreatePost() {
  const { user } = useContext(UserContext)
  const [content, setContent] = useState('')
  const [posting, setPosting] = useState(false)
  if (!user?.userLoading && !user?.uid) {
    return <div>gotta login to post</div>
  }

  const handleCreatePost = async () => {
    await createPost(
      user.uid,
      user.username ?? 'No user name',
      content,
      user?.photoURL ?? null
    )
    setContent('')
    setPosting(false)
  }

  return (
    <AnimatePresence>
      {posting ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='max-w-[500px] w-full p-2 border-[1px] border-primary min-h-[250px] rounded-md flex flex-col justify-between'
        >
          <div className='flex border-b-2 border-primary py-2'>
            <ContentLabel username={user.username} photoURL={user?.photoURL} />
          </div>
          <div className='flex h-full overflow-y-clip'>
            <textarea
              className='w-full h-full outline-none p-2 resize-none'
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='flex justify-center gap-x-4'>
            <Button
              className='w-full max-w-[100px] h-full bg-primary text-white'
              onClick={handleCreatePost}
              disable={!user.uid}
            >
              post
            </Button>
            <Button
              className='w-full max-w-[25px] h-full text-white'
              color='danger'
              onClick={() => setPosting(false)}
            >
              jk
            </Button>
          </div>
        </motion.div>
      ) : (
        <Button
          className='w-full max-w-[500px] h-full bg-primary text-white'
          onClick={() => setPosting(true)}
        >
          sup {user.username}
        </Button>
      )}
    </AnimatePresence>
  )
}

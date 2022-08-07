import { useContext, useEffect, useState } from 'react'

import { UserContext } from 'lib/user-context'
import Button from './elements/buttons/Button'
import { createPost } from 'lib/db'

export default function CreatePost() {
  const { user } = useContext(UserContext)
  const [content, setContent] = useState('')
  if (!user?.userLoading && !user?.uid) {
    return <div>gotta login to post</div>
  }

  const handleCreatePost = async () => {
    await createPost(user.uid, user.username ?? 'No user name', content)
    setContent('')
  }

  return (
    <div className='max-w-[500px] w-full p-2 border-[1px] border-primary min-h-[250px] rounded-md flex flex-col justify-between'>
      <div className='flex border-b-2 border-primary py-2'>
        {user?.username ?? user?.uid}
      </div>
      <div className='flex h-full overflow-y-clip'>
        <textarea
          className='w-full h-full outline-none p-2 resize-none'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className='flex justify-center'>
        <Button
          className='w-full max-w-[100px] h-full bg-primary text-white'
          onClick={handleCreatePost}
          disable={!user.uid}
        >
          Post
        </Button>
      </div>
    </div>
  )
}
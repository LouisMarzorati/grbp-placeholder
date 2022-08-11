import { UserContext } from 'lib/user-context'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { createReply } from 'lib/db'
export default function CreateReply({ postId, parentId = null }) {
  const { user } = useContext(UserContext)
  const [show, setShow] = useState(false)
  const [reply, setReply] = useState('')

  const handleReply = async () => {
    const result = await createReply(
      user.username,
      user.uid,
      postId,
      reply,
      parentId
    )
    if (result) {
      setShow(false)
      setReply('')
      return
    }
    toast.error('Error occured while creating reply')
  }
  if (!show) {
    return (
      <span
        className='cursor-pointer text-primary hover:text-primaryHover'
        onClick={() => {
          setShow(!show)
        }}
      >
        reply
      </span>
    )
  }
  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex'>
        <img
          src={`https://avatars.dicebear.com/api/adventurer/${user?.username}.svg`}
          alt={user?.username}
          className='w-8 h-8 rounded-full'
        />
        <textarea
          className='w-full h-full outline-none p-2 resize-none border-[1px] border-primary'
          value={reply}
          autoFocus
          onChange={(e) => setReply(e.target.value)}
        />
      </div>
      <div className='flex gap-x-2'>
        <span
          className='text-error hover:text-errorHover cursor-pointer'
          onClick={() => {
            setShow(false)
          }}
        >
          cancel
        </span>
        <span
          className='text-primary hover:text-primaryHover cursor-pointer'
          onClick={handleReply}
        >
          send it
        </span>
      </div>
    </div>
  )
}

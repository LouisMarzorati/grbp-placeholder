import { useContext, useEffect, useState } from 'react'

import { UserContext } from 'lib/user-context'
import Button from './elements/buttons/Button'
import { updatePost, deletePost } from 'lib/db'
import ConfirmModal from './elements/modals/ConfirmModal'
import toast from 'react-hot-toast'

export default function Post({ post }) {
  const { user } = useContext(UserContext)
  const [editing, setEditing] = useState(false)
  const [editContent, setEditContent] = useState(post.content ?? '')
  if (!user?.userLoading && !user?.uid) {
    return <div>gotta login to post</div>
  }

  const handleUpdatePost = async () => {
    await updatePost(post.id, editContent)
    setEditing(false)
  }

  const handleDeletePost = async () => {
    await deletePost(post.id)
    toast.success('She gone')
  }

  return (
    <div className='max-w-[500px] w-full p-2 border-[1px] border-primary min-h-[250px] rounded-md flex flex-col justify-between'>
      <div className='flex border-b-2 border-primary py-2 justify-between'>
        {post?.username}
        <div className='mr-4'>
          <ConfirmModal
            title='Warning'
            confirmMessage={`Are you sure you want to delete this post?`}
            confirmButtonText='Delete'
            hideButton={true}
            handleConfirm={() => {
              handleDeletePost()
            }}
          />
        </div>
      </div>
      <div className='flex h-full overflow-y-clip'>
        {!editing && (
          <textarea
            className='w-full h-full outline-none p-2 resize-none'
            readOnly
            value={post?.content}
          />
        )}
        {editing && (
          <textarea
            className='w-full h-full outline-none p-2 resize-none'
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        )}
      </div>
      <div className='flex justify-center'>
        {!editing && user?.uid === post?.owner && (
          <Button
            className='w-full max-w-[100px] h-full bg-primary text-white'
            onClick={() => {
              setEditing(true)
            }}
          >
            Edit
          </Button>
        )}
        {editing && (
          <div className='flex gap-x-4'>
            <Button
              className='w-full max-w-[100px] h-full bg-primary text-white'
              onClick={() => {
                setEditContent(post.content)
                handleUpdatePost(post.id)
              }}
            >
              Update
            </Button>
            <Button
              className='w-full max-w-[100px] h-full bg-primary text-white'
              color='danger'
              onClick={() => {
                setEditing(false)
                setEditContent(post.content)
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

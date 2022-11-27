import { useContext, useEffect, useState } from 'react'
import { UserContext } from 'lib/user-context'
import Button from './elements/buttons/Button'
import { updatePost, deletePost } from 'lib/db'
import ConfirmModal from './elements/modals/ConfirmModal'
import toast from 'react-hot-toast'
import ContentLabel from './ContentLabel'
import CreateReply from './CreateReply'
import { firestore } from 'lib/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
export default function Post({ post, originalPostId = null, isReply = false }) {
  const { user } = useContext(UserContext)
  const [editing, setEditing] = useState(false)
  const [editContent, setEditContent] = useState(post.content ?? '')
  const ref = firestore
    .collection('posts')
    .doc(post.id)
    .collection('replies')
    .orderBy('createdAt', 'desc')
  const [value, loading, error] = useCollection(ref)
  const [replies, setReplies] = useState([])
  if (!user?.userLoading && !user?.uid) {
    return <div>gotta login to post</div>
  }

  const handleUpdatePost = async () => {
    await updatePost(post.id, editContent)
    setEditing(false)
    toast.success('McUpdated')
  }

  const handleDeletePost = async () => {
    await deletePost(post.id)
    toast.success('She gone')
  }

  useEffect(() => {
    if (loading) {
      return
    }

    if (error) {
      toast.error('Error loading replies')
    }
    if (value) {
      const unorderedReplies = value.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      // order replies by createdAt, then parentId
      const orderedReplies = unorderedReplies.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1
        }
        if (a.createdAt > b.createdAt) {
          return 1
        }
        if (a.parentId < b.parentId) {
          return -1
        }
        if (a.parentId > b.parentId) {
          return 1
        }
        return 0
      })
      setReplies(orderedReplies)
    }
  }, [value])

  if (isReply) {
    return (
      <div className='ml-6 max-w-[450px] w-full p-2 flex flex-col justify-between bg-slate-200 my-2 rounded-lg'>
        <div className='flex border-b-2 py-2 justify-between'>
          <ContentLabel
            username={post?.username}
            contentDate={post?.createdAt}
            small={true}
          />
          {user?.uid === post?.owner && (
            <div className='flex items-center gap-x-6'>
              <div>
                {!editing && user?.uid === post?.owner && (
                  <span
                    className='w-full max-w-[100px] h-full p-2 cursor-pointer'
                    onClick={() => {
                      setEditing(true)
                    }}
                  >
                    edit
                  </span>
                )}
                {editing && (
                  <div className='flex gap-x-4'>
                    <span
                      className='w-full max-w-[100px] h-full p-2 cursor-pointer'
                      color='danger'
                      onClick={() => {
                        setEditing(false)
                        setEditContent(post.content)
                      }}
                    >
                      cancel
                    </span>
                    <span
                      className='w-full max-w-[100px] h-full p-2 cursor-pointer'
                      onClick={() => {
                        setEditContent(post.content)
                        handleUpdatePost(post.id)
                      }}
                    >
                      update
                    </span>
                  </div>
                )}
              </div>
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
          )}
        </div>
        <div className='flex h-full overflow-y-clip flex-col'>
          {!editing && (
            <textarea
              className='w-full h-fit outline-none p-2 resize-none cursor-default bg-slate-200'
              readOnly
              value={post?.content}
            />
          )}
          {editing && (
            <textarea
              className='w-full h-fit outline-none p-2 resize-none'
              value={editContent}
              autoFocus
              onChange={(e) => setEditContent(e.target.value)}
            />
          )}

          {replies && replies.length > 0 && (
            <div className='flex flex-col'>
              {replies.map((reply) => (
                <Post
                  key={reply.id}
                  post={reply}
                  isReply={true}
                  parentId={post.id}
                  originalPostId={originalPostId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-[500px] w-full p-2 border-[1px] border-primary min-h-[250px] rounded-md flex flex-col justify-between'>
      <div className='flex border-b-2 border-primary py-2 justify-between'>
        <ContentLabel username={post?.username} contentDate={post?.createdAt} />
        {user?.uid === post?.owner && (
          <div className='flex items-center gap-x-6'>
            <div>
              {!editing && user?.uid === post?.owner && (
                <Button
                  className='w-full max-w-[100px] h-full bg-primary text-white'
                  onClick={() => {
                    setEditing(true)
                  }}
                >
                  edit
                </Button>
              )}
              {editing && (
                <div className='flex gap-x-4'>
                  <Button
                    className='w-full max-w-[100px] h-full bg-primary text-white'
                    color='danger'
                    onClick={() => {
                      setEditing(false)
                      setEditContent(post.content)
                    }}
                  >
                    cancel
                  </Button>
                  <Button
                    className='w-full max-w-[100px] h-full bg-primary text-white'
                    onClick={() => {
                      setEditContent(post.content)
                      handleUpdatePost(post.id)
                    }}
                  >
                    update
                  </Button>
                </div>
              )}
            </div>
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
        )}
      </div>
      <div className='flex h-full overflow-y-clip flex-col'>
        {!editing && (
          <textarea
            className='w-full h-full outline-none p-2 resize-none cursor-default'
            readOnly
            value={post?.content}
          />
        )}
        {editing && (
          <textarea
            className='w-full h-full outline-none p-2 resize-none'
            value={editContent}
            autoFocus
            onChange={(e) => setEditContent(e.target.value)}
          />
        )}

        {replies && replies.length > 0 && (
          <div className='flex flex-col'>
            {replies.map((reply) => (
              <Post
                key={reply.id}
                post={reply}
                originalPostId={post.id}
                isReply={true}
              />
            ))}
          </div>
        )}
        {!isReply && <CreateReply postId={post?.id} />}
      </div>
    </div>
  )
}

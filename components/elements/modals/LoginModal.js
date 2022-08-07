import Button from '@/components/elements/buttons/Button'
import LoadingButton from '@/components/elements/buttons/LoadingButton'
import Input from '@/components/elements/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ModalElement from './Modal'
import { auth, googleAuthProvider, twitterAuthProvider } from '@/lib/firebase'

export default function LoginModal({ altLayout = false }) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [creatingAccount, setCreatingAccount] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const signinWithEmail = async (email, password) => {
    setLoading(true)
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (r) => {
        await handleUser(user)
        setLoading(false)
      })
      .catch((e) => {
        console.error(e)
        setLoading(false)
      })
  }

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser)
      await createUser(user.id, user)
      setLoading(false)
      return user
    } else {
      setLoading(false)
      return false
    }
  }

  const formatUser = (user) => {
    return {
      id: user.id,
      email: user.email,
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let result
      if (creatingAccount) {
        result = await auth.createUserWithEmailAndPassword(email, password)
      } else {
        result = await auth.signInWithEmailAndPassword(email, password)
      }

      if (result) {
        closeModal()
        toast.success('Howdy!')
      }
    } catch (error) {
      toast.error('An error occured while signing in. Please try again later.')
      setLoading(false)
    }
  }

  return (
    <>
      <Button disabled={loading} onClick={openModal} className='w-fit'>
        {altLayout ? 'Login to Sign Up' : 'Login'}
      </Button>

      <ModalElement
        title='Sign In'
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        hasBorder={false}
      >
        <div className='flex flex-col w-full gap-y-7 p-2'>
          <div className='flex flex-col h-full justify-center align-middle w-full'>
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='w-full'>
                <div className='flex flex-col gap-y-6 justify-center items-center'>
                  {GoogleSignInButton()}
                  {TwitterSignInButton()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalElement>
    </>
  )
}

function GoogleSignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }

  return (
    <>
      <button className='flex gap-x-4' onClick={signInWithGoogle}>
        <img src={'/google.png'} width='30px' />
        <span className='text-lg'>Sign in with Google</span>
      </button>
    </>
  )
}

function TwitterSignInButton() {
  const signInWithTwitter = async () => {
    await auth.signInWithPopup(twitterAuthProvider)
  }

  return (
    <>
      <button className='flex gap-x-4' onClick={signInWithTwitter}>
        <img src={'/twitter.png'} width='30px' />
        <span className='text-lg'>Sign in with Twitter</span>
      </button>
    </>
  )
}

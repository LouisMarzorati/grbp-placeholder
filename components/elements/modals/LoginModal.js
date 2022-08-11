import Button from '@/components/elements/buttons/Button'
import LoadingButton from '@/components/elements/buttons/LoadingButton'
import Input from '@/components/elements/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ModalElement from './ModalElement'
import { auth, googleAuthProvider, twitterAuthProvider } from '@/lib/firebase'
import { facebookAuthProvider } from 'lib/firebase'

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
        modalIsOpen={modalIsOpen}
        handleClose={closeModal}
        hasBorder={false}
      >
        <div className='flex flex-col w-full gap-y-7 p-2'>
          <div className='flex flex-col h-full justify-center align-middle w-full'>
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='w-full'>
                <div className='flex flex-col gap-y-6 justify-center items-center'>
                  {GoogleSignInButton()}
                  {TwitterSignInButton()}
                  {FacebookSignInButton()}
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
    try {
      await auth.signInWithPopup(googleAuthProvider)
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast.error('An account with this email already exists.')
      } else {
        toast.error(
          'An error occured while signing in. Please try again later.'
        )
      }
    }
  }

  return (
    <button
      className='flex gap-x-4 p-4 hover:bg-slate-100 text-2xl rounded-md '
      onClick={signInWithGoogle}
    >
      <img src={'/google.png'} width='30px' />
      <span>Sign in with Google</span>
    </button>
  )
}

function TwitterSignInButton() {
  const signInWithTwitter = async () => {
    try {
      await auth.signInWithPopup(twitterAuthProvider)
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast.error('An account with this email already exists.')
      } else {
        toast.error(
          'An error occured while signing in. Please try again later.'
        )
      }
    }
  }

  return (
    <button
      className='flex gap-x-4 p-4 hover:bg-slate-100 text-2xl rounded-md '
      onClick={signInWithTwitter}
    >
      <img src={'/twitter.png'} width='30px' />
      <span>Sign in with Twitter</span>
    </button>
  )
}
function FacebookSignInButton() {
  const signInWithFacebook = async () => {
    try {
      await auth.signInWithPopup(facebookAuthProvider)
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast.error('An account with this email already exists.')
      } else {
        toast.error(
          'An error occured while signing in. Please try again later.'
        )
      }
    }
  }

  return (
    <button
      className='flex gap-x-4 p-4 hover:bg-slate-100 text-2xl rounded-md '
      onClick={signInWithFacebook}
    >
      <img src={'/facebook.png'} width='30px' />
      <span>Sign in with Facebook</span>
    </button>
  )
}

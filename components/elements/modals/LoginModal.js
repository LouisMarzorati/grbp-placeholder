import Button from '@/components/elements/buttons/Button'
import LoadingButton from '@/components/elements/buttons/LoadingButton'
import Input from '@/components/elements/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ModalElement from './Modal'
import { auth } from '@/lib/firebase'

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
        title=''
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        hasBorder={false}
      >
        <div className='flex flex-col w-full gap-y-7 p-2'>
          <div className='flex flex-col h-full justify-center align-middle w-full'>
            <div className='mb-8'>
              <div className='text-center text-4xl text-offBlack'>
                {altLayout ? 'Login to Sign Up' : 'Login'}
              </div>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='w-full'>
                <form
                  className='w-full flex flex-col gap-3'
                  onSubmit={handleSubmit}
                >
                  <Input
                    id='email'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    id='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className='flex flex-col items-center justify-between'>
                    <LoadingButton
                      className={`h-[50px] rounded-[6px] font-light text-lg disabled:bg-error`}
                      type='submit'
                      text={`${creatingAccount ? 'Sign up' : 'Login'}`}
                      loadingtext={`${
                        creatingAccount ? 'Signing up...' : 'Logging in...'
                      }`}
                      loading={loading}
                    />
                    <div className='flex flex-col items-center mt-10'>
                      {!creatingAccount ? (
                        <span
                          className='inline-block align-baseline text-primary font-medium transition-colors cursor-pointer'
                          onClick={() => setCreatingAccount(true)}
                        >
                          Create Account
                        </span>
                      ) : (
                        <span
                          className='inline-block align-baseline text-primary font-medium transition-colors cursor-pointer'
                          onClick={() => setCreatingAccount(false)}
                        >
                          Login
                        </span>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ModalElement>
    </>
  )
}

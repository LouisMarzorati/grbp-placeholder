import { UserContext } from 'lib/user-context'
import { firestore } from 'lib/firebase'
import { useState, useContext, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'
import Input from './elements/Input'
import Button from './elements/buttons/Button'
export default function UsernameForm({ email }) {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user, username } = useContext(UserContext)

  const onSubmit = async (e) => {
    e.preventDefault()

    const userDoc = firestore.doc(`users/${user.uid}`)
    const usernameDoc = firestore.doc(`usernames/${formValue}`)

    const batch = firestore.batch()
    batch.set(userDoc, {
      username: formValue,
      photoURL: user?.photoURL ?? '',
      displayName: user?.displayName ?? '',
    })
    batch.set(usernameDoc, { uid: user.uid })

    await batch.commit()
  }

  const onChange = (e) => {
    const val = e.target.value.toLowerCase()
    const re = /^[a-z0-9_]{3,}$/

    if (val.length < 3) {
      setFormValue(val)
      setLoading(false)
      setIsValid(false)
    }

    if (re.test(val)) {
      setFormValue(val)
      setLoading(true)
      setIsValid(false)
    }
  }

  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`)
        const { exists } = await ref.get()
        console.log('Firestore read executed!')
        setIsValid(!exists)
        setLoading(false)
      }
    }, 500),
    []
  )

  return (
    !username && (
      <div className='flex flex-col gap-y-4'>
        <span className='text-2xl font-semibold'>Choose Username</span>
        <form onSubmit={onSubmit}>
          <Input
            name='username'
            placeholder='cool_guy_69'
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <Button type='submit' className='btn-green' disabled={!isValid}>
            Choose
          </Button>
        </form>
      </div>
    )
  )
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>
  } else if (isValid) {
    return <p className='text-success'>{username} is available!</p>
  } else if (username && !isValid) {
    return <p className='text-danger'>That username is taken 😤</p>
  } else {
    return <p></p>
  }
}

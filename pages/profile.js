import { useContext, useState } from 'react'
import { UserContext } from 'lib/user-context'

import { updateUsername } from 'lib/db'
import Button from 'components/elements/buttons/Button'
import UsernameForm from 'components/UsernameForm'
export default function ProfilePage() {
  const { user } = useContext(UserContext)
  const [changingUsername, setChangingUsername] = useState(false)

  return (
    <div className='flex flex-col gap-y-4'>
      <div>Email: {user?.email}</div>
      <div>Username: {user?.username}</div>

      {!changingUsername && (
        <Button onClick={() => setChangingUsername(true)}>
          Change Username
        </Button>
      )}
      {changingUsername && (
        <Button onClick={() => setChangingUsername(false)} color='danger'>
          Cancel
        </Button>
      )}
      {changingUsername && <UsernameForm changing={true} />}
    </div>
  )
}

import { useContext, useState } from 'react'
import { UserContext } from 'lib/user-context'

import { updateUsername } from 'lib/db'
import Button from 'components/elements/buttons/Button'
export default function ProfilePage() {
  const { user } = useContext(UserContext)

  return (
    <div className='flex flex-col gap-y-4'>
      <div>Email: {user?.email}</div>
      <div>Name: {user?.name}</div>
      <div>Username: {user?.username}</div>
      <div>
        <Button color='danger'>Reset Password</Button>
      </div>
    </div>
  )
}

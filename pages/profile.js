import { useContext, useState } from 'react'
import { UserContext } from 'lib/user-context'
import Phonenumber from 'components/elements/Phonenumber'
import { updatePhoneNumber } from 'lib/db'
import Button from 'components/elements/buttons/Button'
import UsernameForm from 'components/UsernameForm'
import { toast } from 'react-hot-toast'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
export default function ProfilePage() {
  const { user } = useContext(UserContext)
  const [changingUsername, setChangingUsername] = useState(false)
  const [changePhone, setChangePhone] = useState(false)
  const [phone, setPhone] = useState(user?.phone ?? '')
  const handleUpdatePhoneNumber = async () => {
    const result = await updatePhoneNumber(user.uid, phone)
    if (result) {
      toast.success('Phone number changed successfully')
      setChangePhone(false)
      return
    }
    toast.error('Error updating phone number')
  }
  return (
    <div className='flex flex-col gap-y-4'>
      <div>Email: {user?.email}</div>
      <div>Username: {user?.username}</div>
      <div>Phone: {user?.phone}</div>
      <span className='text-sm -mt-4'>
        enter phone number for text notifications
      </span>

      {changePhone && (
        <div className='flex gap-x-2 justify-center items-center'>
          <Phonenumber userPhone={user?.phone ?? null} setPhone={setPhone} />
        </div>
      )}
      {!changePhone && (
        <Button onClick={() => setChangePhone(true)}>
          Update Phone Number
        </Button>
      )}
      {changePhone && (
        <div className='flex gap-x-4'>
          <Button onClick={() => setChangePhone(false)} color='danger'>
            Cancel
          </Button>

          <Button
            onClick={() => handleUpdatePhoneNumber()}
            disabled={!isPossiblePhoneNumber(phone ?? '')}
          >
            Update
          </Button>
        </div>
      )}
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

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
export default function Phonenumber({ userPhone, setPhone }) {
  const [value, setValue] = useState(userPhone)
  return (
    <PhoneInput
      placeholder='Phone Number'
      style={{ width: '100%' }}
      value={value}
      onChange={(e) => {
        setValue(e)
        setPhone(e)
      }}
      defaultCountry='US'
      countries={['US', 'CA', 'GB', 'AU']}
    />
  )
}

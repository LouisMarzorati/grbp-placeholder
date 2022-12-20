import { useState } from 'react'
import { setCookie } from 'nookies'
import Button from '@/components/elements/buttons/Button'
import Input from '@/components/elements/Input'
export default function SiteLogin({ fromModal = false }) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const req = await fetch('/api/site-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
      }),
    })
    if (req.ok) {
      await req.json()
      setCookie(null, 'site-login', true, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      window.location.reload()
    } else {
      setCookie(null, 'site-login', false, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
    }
    setLoading(false)
  }

  return (
    <div
      className={`relative flex ${
        !fromModal ? 'min-h-screen' : ''
      } flex-col justify-center overflow-hidden`}
    >
      <div className='relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 sm:w-full'>
        <div className='mx-auto max-w-md'>
          <div className='divide-y divide-gray-300/50'>
            <div className='space-y-6 py-8 text-base leading-7 text-gray-600'>
              <p>Site Login</p>
              <span className='text-sm leading-5 text-gray-500'>
                Enter the site password to begin.
              </span>

              <div className='mt-6 w-full'>
                <div className='col-span-1'>
                  <div className='rounded-md shadow-sm mb-6'>
                    <Input
                      id='password'
                      type='password'
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Button onClick={handleSubmit}>
                    {loading ? 'Logging In' : 'Login'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

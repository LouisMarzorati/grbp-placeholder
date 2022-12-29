import Link from 'next/link'
import Image from 'next/image'
import LoginModal from '@/components/elements/modals/LoginModal'
import { UserContext } from 'lib/user-context'
import { useContext } from 'react'
import { useRouter } from 'next/router'
export default function Nav({ isLoggedIn, className }) {
  const { user } = useContext(UserContext)
  const router = useRouter()
  return (
    <div
      className={`${className ?? ''} flex items-center flex-wrap p-6 w-full`}
    >
      <div className='flex-1 justify-center items-center'>
        <Image
          src='/marco.svg'
          alt='Marco'
          width={150}
          height={75}
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
      </div>

      <div className='flex justify-end'>
        {isLoggedIn ? (
          <div className='flex'>
            <div className='rounded-full ring-4 ring-[#414141] flex flex-col items-center cursor-pointer'>
              <Link href='/profile'>
                {user?.photoURL ? (
                  <Image
                    alt='Profile'
                    width={75}
                    src={user?.photoURL}
                    height={75}
                    className='rounded-full object-cover'
                  />
                ) : (
                  <Image
                    src={`https://avatars.dicebear.com/api/adventurer/${user?.username}.svg`}
                    alt='Marco'
                    width={50}
                    height={50}
                  />
                )}
              </Link>
            </div>
          </div>
        ) : (
          <LoginModal />
        )}
      </div>
    </div>
  )
}

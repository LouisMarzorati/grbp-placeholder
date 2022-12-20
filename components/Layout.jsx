import Button from '@/components/elements/buttons/Button'
import Nav from '@/components/Nav'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import LoginModal from '@/components/elements/modals/LoginModal'
import { signOut } from '@/lib/firebase'
import Link from 'next/link'
import { motion } from 'framer-motion'
export default function Layout({ children, isLoggedIn }) {
  const router = useRouter()

  const handleLogout = () => {
    signOut()
  }
  return (
    <div>
      <Nav>
        <div className='flex'>
          {isLoggedIn ? (
            <div className='flex items-center gap-x-4'>
              <Link href='/balls'>
                <div className='cursor-pointer'>
                  No polo? play with our balls
                </div>
              </Link>
              <Link href='/profile'>
                <div className='cursor-pointer'>profile</div>
              </Link>
              <Button color='danger' onClick={handleLogout}>
                logout
              </Button>
            </div>
          ) : (
            <LoginModal />
          )}
        </div>
      </Nav>

      <div className='flex w-full overflow-hidden'>
        <Toaster
          toastOptions={{
            autoClose: 5000,
            style: {
              fontSize: '14px',
              padding: '1rem 1rem 1rem 0',
              borderRadius: '2px',
              border: '1px solid',
            },
            success: {
              style: {
                background: '#C7F6E0',
                color: '#008E83',
                borderColor: '#A3E2CC',
              },
              icon: '',
            },
            error: {
              style: {
                background: '#F8D7DA',
                color: '#883B41',
                borderColor: '#F5C6CB',
              },
              icon: '',
            },
          }}
          containerStyle={{
            bottom: 0,
          }}
          position='bottom-center'
        />
        <motion.div
          className='w-full p-8 flex justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={router.route}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
import Button from '@/components/elements/buttons/Button'
import Nav from '@/components/Nav'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import LoginModal from '@/components/elements/modals/LoginModal'
import { signOut } from '@/lib/firebase'

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
            <Button className='h-[50px]' onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <LoginModal />
          )}
        </div>
      </Nav>

      <div className='flex w-full overflow-hidden bg-white'>
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
        <div className='w-full p-8 flex justify-center'>{children}</div>
      </div>
    </div>
  )
}

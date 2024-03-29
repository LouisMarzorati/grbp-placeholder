import 'styles/globals.css'
import { UserContext } from 'lib/user-context'
import { useUser } from 'lib/useUser'
import Loader from 'components/elements/Loader'
import Layout from 'components/Layout'
import Header from 'components/Header'
import UsernameForm from 'components/UsernameForm'
import LandingPage from 'components/LandingPage'
function MyApp({ Component, pageProps }) {
  const userData = useUser()
  if (userData.userLoading) {
    return (
      <div className='fixed z-40 top-0 left-0 w-full h-full flex justify-center items-center'>
        <div className='fixed w-full h-full bg-white opacity-70'></div>
        <Loader
          className='!h-14 !w-14'
          containerClassName='flex justify-center items-center flex-col z-50 gap-y-3 py-10 px-20'
          loaderText='Please wait...'
        />
      </div>
    )
  }

  if (!userData?.user?.uid) {
    return (
      <>
        <Header title='GRBP' />
        <Layout isLoggedIn={false}>
          <LandingPage />
        </Layout>
      </>
    )
  }

  return (
    <UserContext.Provider value={userData}>
      <Header title='GRBP' />
      <Layout isLoggedIn={userData.user?.uid}>
        {!userData?.user?.username ? (
          <div className='flex flex-col gap-y-4 w-full max-w-[500px]'>
            <UsernameForm />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </UserContext.Provider>
  )
}

export default MyApp

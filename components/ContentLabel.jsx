import ReactTimeago from 'react-timeago'
import convertFirebaseTime from 'utils/convertTime'

export default function ContentLabel({
  username,
  contentDate,
  small = false,
  photoURL,
}) {
  if (small) {
    return (
      <div className='flex items-center gap-x-4 w-full max-w-[200px]'>
        <img
          src={
            photoURL
              ? photoURL
              : `https://avatars.dicebear.com/api/adventurer/${username}.svg`
          }
          alt={username}
          className='w-8 h-8 rounded-full object-cover'
        />

        <div>
          <div className='flex flex-col'>
            <span className='font-bold'>{username}</span>
            <span className='text-[#C4A3C4]'>
              <ReactTimeago date={convertFirebaseTime(contentDate)} />
            </span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='flex items-center gap-x-4'>
      <img
        src={
          photoURL
            ? photoURL
            : `https://avatars.dicebear.com/api/adventurer/${username}.svg`
        }
        alt={username}
        className='w-16 h-16 rounded-full object-cover'
      />

      <div>
        <div className='flex flex-col'>
          <span className='font-bold'>{username}</span>
          <span className='text-[#C4A3C4]'>
            <ReactTimeago date={convertFirebaseTime(contentDate)} />
          </span>
        </div>
      </div>
    </div>
  )
}

import ReactTimeago from 'react-timeago'

export default function ContentLabel({ username, imageUrl, contentDate }) {
  return (
    <div className='flex items-center gap-x-4'>
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt={username} className='w-8 h-8 rounded-full' />
        ) : (
          <div className='w-8 h-8 rounded-full bg-gray-200' />
        )}
      </div>
      <div>
        <div className='flex items-center'>
          <span className='font-bold'>{username}</span>
          <span className='text-gray-600'>
            <ReactTimeago date={contentDate?.seconds} />
          </span>
        </div>
      </div>
    </div>
  )
}

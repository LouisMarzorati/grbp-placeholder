import Link from 'next/link'

export default function Nav({ children, className }) {
  return (
    <div
      className={`${
        className ?? ''
      } flex items-center justify-between flex-wrap  p-6 border-b-2`}
    >
      <div className='flex items-center flex-shrink-0  mr-6'>
        <Link href='/'>
          <div className='text-2xl font-semibold cursor-pointer'>GRBP</div>
        </Link>
      </div>

      {children}
    </div>
  )
}

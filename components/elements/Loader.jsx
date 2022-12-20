export default function Loader({ loaderText, containerClassName, className }) {
  return (
    <div
      className={`${containerClassName} py-4 px-6 flex justify-center items-center flex-col`}
    >
      <svg
        className={`${className} animate-spin w-10 h-10`}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          cx='12'
          cy='12'
          r='10'
          stroke='#efefef'
          strokeWidth='4'
        ></circle>
        <path
          fill='#333'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
      </svg>
      <div className='font-medium text-xl'>
        {loaderText ?? 'Please wait...'}
      </div>
    </div>
  )
}

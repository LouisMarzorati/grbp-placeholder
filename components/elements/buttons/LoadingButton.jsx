export default function LoadingButton({
  loading,
  text,
  loadingtext,
  strokeWidth,
  ...props
}) {
  const { className, disabled, ...rest } = props
  return (
    <div className='flex items-center justify-center'>
      <button
        type='button'
        {...rest}
        className={`${className} disabled:bg-ghost disabled:hover:bg-ghost disabled:cursor-not-allowed h-[50px] text-lg flex align-middle items-center bg-primary hover:bg-primaryHover rounded-[10px] transition-colors py-2 px-7 font-medium text-white ${
          loading ? 'cursor-not-allowed' : ''
        }`}
        disabled={loading || disabled}
      >
        {loading && (
          <svg
            className='animate-spin -ml- h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth={strokeWidth || '4'}
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        )}
        {loadingtext && loading ? (
          <div className='flex w-full justify-center ml-3'>{loadingtext}</div>
        ) : !loading ? (
          <div className='flex w-full justify-center'>{text}</div>
        ) : null}
      </button>
    </div>
  )
}

export default function Input({ label, ...props }) {
  const { className, ...rest } = props
  if (label) {
    return (
      <label className='block w-full'>
        <span className='text-offBlack font-bold ml-[1px]'>{label}</span>
        <input
          {...rest}
          className={`${className} font-lato text-lg text-offBlack transition-colors block appearance-none w-full h-[50px] hover:border-offGray border border-ghost px-5 py-2 pr-6 mt-1 rounded-[10px] leading-tight focus:ring-transparent focus:border-offGray shadow-none disabled:cursor-not-allowed disabled:bg-ghost disabled:border-none placeholder-ghost`}
        />
      </label>
    )
  } else {
    return (
      <input
        {...rest}
        className={`${className} font-lato text-lg text-offBlack transition-colors block appearance-none w-full h-[50px] bg-white px-5 py-2 pr-6 rounded-[10px] leading-tight focus:ring-transparent focus:border-offGray hover:border-offGray border border-ghost shadow-none disabled:cursor-not-allowed disabled:bg-backdrop disabled:border-none placeholder-ghost`}
      />
    )
  }
}

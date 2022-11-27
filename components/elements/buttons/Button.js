import Image from 'next/image'
import { useEffect, useState } from 'react'
export default function Button({ children, ...props }) {
  const { className, color, src, width, height, disabled, ...rest } = props
  const [bg, setBg] = useState('')
  useEffect(() => {
    switch (color) {
      case 'danger':
        setBg('bg-error hover:bg-errorHover text-white')
        break
      default:
        setBg('bg-primary hover:bg-primaryHover text-white')
        break
    }
  }, [color])
  return (
    <button
      className={`${className} ${bg} h-[40px] text-lg rounded-[10px] hover:transition-colors py-2 px-7 mx-2 font-semibold flex items-center text-center justify-center disabled:bg-neutral`}
      {...rest}
      disabled={disabled}
    >
      {src && (
        <div className='flex mr-2'>
          <Image src={src} width={width} height={height} />
        </div>
      )}
      {children}
    </button>
  )
}

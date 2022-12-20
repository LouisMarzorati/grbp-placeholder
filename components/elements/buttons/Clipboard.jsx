import Image from 'next/image'
import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
export default function Clipboard({
  buttonText,
  buttonCopiedText,
  text,
  copiedProp = false,
  assignedLinkPage = false,
  ...props
}) {
  const [copied, setCopied] = useState(copiedProp)
  const { className, ...rest } = props
  useEffect(() => {
    setCopied(copiedProp)
    if (!assignedLinkPage) {
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }, [copiedProp])
  return (
    <div className='flex items-center justify-center'>
      {copied ? (
        <button
          type='button'
          {...rest}
          className={`${className} h-[50px] text-lg bg-lightTeal hover:bg-lighterTeal rounded-[10px] transition-colors py-2 px-4 font-medium text-shadowTeal`}
        >
          <div className='flex w-full justify-center'>
            <span className='mr-2'>{buttonCopiedText}</span>
            <Image src='/images/copied-link-icon.svg' width={20} height={22} />
          </div>
        </button>
      ) : (
        <CopyToClipboard onCopy={() => setCopied(true)} text={text}>
          <button
            type='button'
            {...rest}
            className={`${className} h-[50px] text-lg bg-primary hover:bg-primaryHover rounded-[10px] transition-colors py-2 px-4 font-medium text-white`}
          >
            <div className='flex w-full justify-center'>
              <span className='mr-2'>{buttonText}</span>
              <Image src='/images/copy-link-icon.svg' width={20} height={22} />
            </div>
          </button>
        </CopyToClipboard>
      )}
    </div>
  )
}

import { motion } from 'framer-motion'
export default function Backdrop({ children, onClick }) {
  return (
    <motion.div
      className='absolute z-10 top-0 left-0 h-full w-full flex justify-center items-center bg-[#00000046] overflow-y-hidden'
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, duration: 0.2, transition: { ease: 'easeInOut' } }}
      exit={{ opacity: 0 }}
    >
      <div className='flex flex-col justify-center items-center'>
        {children}
      </div>
    </motion.div>
  )
}

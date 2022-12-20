import { motion, AnimatePresence } from 'framer-motion'
import Backdrop from '../Backdrop'
export default function ModalElement({
  title,
  handleClose,
  children,
  modalIsOpen,
}) {
  if (!modalIsOpen) {
    return null
  }
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className='flex flex-col bg-white text-black rounded-md overflow-y-hidden items-center p-4'
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, duration: 0.2 }}
        exit={{ opacity: 0 }}
      >
        {title && <div className='font-semibold text-2xl'>{title}</div>}
        <div className='flex flex-col'>{children}</div>
      </motion.div>
    </Backdrop>
  )
}

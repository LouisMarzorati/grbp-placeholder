import Modal from 'react-modal'
import { motion, AnimatePresence } from 'framer-motion'
let customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    overflow: 'auto',
    maxWidth: '1200px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '999',
  },
}

export default function ModalElement({
  title,
  modalIsOpen,
  closeModal,
  children,
}) {
  return (
    <AnimatePresence>
      <Modal
        id='modal'
        name='modal'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
        ariaHideApp={false}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {title && <div className='font-semibold text-lg'>{title}</div>}
          <div className='flex flex-col'>{children}</div>
        </motion.div>
      </Modal>
    </AnimatePresence>
  )
}

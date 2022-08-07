import Image from 'next/image'
import Modal from 'react-modal'

let customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    padding: '20px 3rem 10px',
    overflow: 'auto',
    minWidth: '500px',
    maxWidth: '1200px',
    minHeight: '250px',
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
  hasBorder = true,
}) {
  return (
    <div className='flex-col'>
      <Modal
        id='modal'
        name='modal'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
        ariaHideApp={false}
      >
        <div
          className={`flex mb-7 pb-3 justify-between ${
            hasBorder && 'border-b-[1px]'
          } border-primary h-full`}
        >
          <div className='font-semibold text-lg'>{title}</div>
        </div>
        <div className='flex flex-col'>{children}</div>
      </Modal>
    </div>
  )
}

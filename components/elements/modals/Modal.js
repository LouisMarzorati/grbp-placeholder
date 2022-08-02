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
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px 3rem 10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
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
          } border-ghost h-full`}
        >
          <div className='font-semibold text-lg'>{title}</div>
          <div onClick={closeModal} className='cursor-pointer hover:opacity-50'>
            <Image src='/x.svg' width={17} height={17} />
          </div>
        </div>
        <div className='flex flex-col'>{children}</div>
      </Modal>
    </div>
  )
}

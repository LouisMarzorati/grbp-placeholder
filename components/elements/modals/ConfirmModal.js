import { useState } from 'react'
import ModalElement from './Modal'
import Button from '@/components/elements/buttons/Button'

export default function ConfirmModal({
  hideButton,
  title = 'Warning',
  confirmButtonText,
  handleConfirm,
  confirmMessage,
  loading,
}) {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      {!hideButton && (
        <Button disabled={loading} onClick={openModal} className='w-fit'>
          {confirmButtonText}
        </Button>
      )}

      <ModalElement
        title={title}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        small
      >
        <div className='flex flex-col w-full h-44 gap-y-7'>
          <div className='flex w-full text-lg'>{confirmMessage}</div>
          <div className='flex'>
            <Button onClick={closeModal} color='gray' className='ml-0'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleConfirm(true)
                closeModal()
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </ModalElement>
    </>
  )
}
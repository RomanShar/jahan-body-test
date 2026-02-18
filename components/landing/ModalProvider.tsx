'use client'

import { createContext, useContext, useState, useCallback, useRef } from 'react'
import ApplicationModal from './ApplicationModal'

interface ModalContextValue {
  openModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<Element | null>(null)
  const openModal = useCallback(() => {
    triggerRef.current = document.activeElement
    setIsOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setIsOpen(false)
    requestAnimationFrame(() => {
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus()
      triggerRef.current = null
    })
  }, [])

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <ApplicationModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  )
}

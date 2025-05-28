"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface ModalProps {
  title: string
  content: React.ReactNode
  onClose: () => void
}

export default function Modal({ title, content, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Prevent scrolling of the background when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-gray-900 border border-green-500 rounded-md w-full max-w-3xl max-h-[80vh] overflow-y-auto animate-scaleIn"
      >
        <div className="flex items-center justify-between p-4 border-b border-green-500/30">
          <h2 className="text-green-500 font-mono text-lg">{title}.exe</h2>
          <button
            onClick={onClose}
            className="text-green-500 hover:text-green-400 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 text-gray-200">{content}</div>
      </div>
    </div>
  )
}

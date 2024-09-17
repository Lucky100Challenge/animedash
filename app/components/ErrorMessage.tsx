'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (errorRef.current) {
      anime({
        targets: errorRef.current,
        translateX: [
          { value: -10, duration: 100, easing: 'easeInOutQuad' },
          { value: 10, duration: 100, easing: 'easeInOutQuad' },
          { value: -10, duration: 100, easing: 'easeInOutQuad' },
          { value: 10, duration: 100, easing: 'easeInOutQuad' },
          { value: 0, duration: 100, easing: 'easeInOutQuad' },
        ],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .8)',
      })
    }
  }, [message])

  return (
    <div
      ref={errorRef}
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  )
}
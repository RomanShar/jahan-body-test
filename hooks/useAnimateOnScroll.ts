'use client'

import { useEffect, useRef, useState } from 'react'

export function useAnimateOnScroll<T extends HTMLElement>(threshold = 0.2) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemsRef = useRef<(T | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleItems((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold }
    )

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [threshold])

  return { visibleItems, itemsRef }
}

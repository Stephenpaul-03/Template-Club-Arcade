import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

function getIsMobileOrTouch() {
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
  const isSmallScreen = window.innerWidth <= 768
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches
  const isMobileUserAgent =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  return isTouchDevice || isSmallScreen || hasCoarsePointer || isMobileUserAgent
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return true
    return getIsMobileOrTouch()
  })
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(getIsMobileOrTouch())

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const cursorEl = cursorRef.current
    if (!cursorEl) return

    const root = document.documentElement
    root.classList.add("has-custom-cursor")

    let rafId = 0
    let nextX = 0
    let nextY = 0
    let hasMoved = false

    const render = () => {
      cursorEl.style.left = `${nextX}px`
      cursorEl.style.top = `${nextY}px`
      rafId = 0
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!hasMoved) {
        hasMoved = true
        cursorEl.style.opacity = "1"
      }

      nextX = e.clientX
      nextY = e.clientY

      if (rafId) return
      rafId = window.requestAnimationFrame(render)
    }

    const onPointerDown = () => setIsClicking(true)
    const onPointerUp = () => setIsClicking(false)

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointerup", onPointerUp)
    window.addEventListener("blur", onPointerUp)

    return () => {
      root.classList.remove("has-custom-cursor")
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointerup", onPointerUp)
      window.removeEventListener("blur", onPointerUp)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={cn(
        "fixed left-0 top-0 z-[99999] size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-black/15 opacity-0 pointer-events-none transition-transform duration-150 ease-out dark:border-white dark:bg-white/20",
        isClicking && "scale-125"
      )}
    />
  )
}

export default CustomCursor

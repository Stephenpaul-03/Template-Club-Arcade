"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme/theme-provider"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative rounded-full border-0 shadow-none"
    >
      {isDark ? (
        <Moon className="text-yellow-300 transition-all" />
      ) : (
        <Sun className="text-blue-500 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

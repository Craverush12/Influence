import * as React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns for different breakpoints
   * @default { sm: 1, md: 2, lg: 3, xl: 4 }
   */
  cols?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  /**
   * Gap between grid items
   * @default "md"
   */
  gap?: "none" | "sm" | "md" | "lg" | "xl"
}

export function ResponsiveGrid({ 
  children, 
  className,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "md",
  ...props 
}: ResponsiveGridProps) {
  const gapClasses = {
    none: "gap-0",
    sm: "gap-3",
    md: "gap-4 sm:gap-6",
    lg: "gap-6 sm:gap-8",
    xl: "gap-8 sm:gap-10",
  }

  const colClasses = [
    cols.sm && `grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    cols["2xl"] && `2xl:grid-cols-${cols["2xl"]}`,
  ].filter(Boolean).join(" ")

  return (
    <div
      className={cn(
        "grid w-full",
        gapClasses[gap],
        colClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Responsive container with max-width and padding
 */
export function ResponsiveContainer({ 
  children, 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Responsive section with padding
 */
export function ResponsiveSection({ 
  children, 
  className,
  ...props 
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn(
        "py-12 sm:py-16 lg:py-20",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

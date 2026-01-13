'use client'

import { Toaster as Sonner } from 'sonner'
import { useTheme } from 'next-themes'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg rounded-xl',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: 'group-[.toaster]:bg-green-500/10 group-[.toaster]:border-green-500/20 group-[.toaster]:text-green-600 dark:group-[.toaster]:text-green-400',
          error: 'group-[.toaster]:bg-destructive/10 group-[.toaster]:border-destructive/20 group-[.toaster]:text-destructive',
          warning: 'group-[.toaster]:bg-amber-500/10 group-[.toaster]:border-amber-500/20 group-[.toaster]:text-amber-600 dark:group-[.toaster]:text-amber-400',
          info: 'group-[.toaster]:bg-blue-500/10 group-[.toaster]:border-blue-500/20 group-[.toaster]:text-blue-600 dark:group-[.toaster]:text-blue-400',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

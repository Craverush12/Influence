import * as React from "react"
import { cn } from "@/lib/utils"

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "elevated" | "interactive" | "gradient"
  hover?: boolean
}

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, variant = "default", hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "rounded-2xl transition-all duration-300",
          
          // Variant styles
          {
            // Default - Clean card with subtle shadow
            "default": "bg-card border border-border shadow-sm",
            
            // Glass - Glassmorphism effect
            "glass": "bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/50 shadow-lg",
            
            // Elevated - Raised card with strong shadow
            "elevated": "bg-card border border-border shadow-lg dark:shadow-xl dark:shadow-black/20",
            
            // Interactive - Card with hover lift
            "interactive": "bg-card border border-border shadow-md hover:shadow-xl dark:shadow-black/10",
            
            // Gradient - Card with gradient border
            "gradient": "relative bg-card border-0 shadow-lg before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-primary before:via-accent before:to-primary/50 before:-z-10",
          }[variant],
          
          // Hover effects
          hover && variant === "interactive" && "hover:scale-[1.02] hover:-translate-y-1",
          hover && variant === "elevated" && "hover:scale-[1.01] hover:shadow-2xl",
          hover && variant === "gradient" && "hover:scale-[1.01]",
          
          className
        )}
        {...props}
      />
    )
  }
)
PremiumCard.displayName = "PremiumCard"

const PremiumCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}
    {...props}
  />
))
PremiumCardHeader.displayName = "PremiumCardHeader"

const PremiumCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-display font-bold leading-tight tracking-tight",
      className
    )}
    {...props}
  />
))
PremiumCardTitle.displayName = "PremiumCardTitle"

const PremiumCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
PremiumCardDescription.displayName = "PremiumCardDescription"

const PremiumCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
PremiumCardContent.displayName = "PremiumCardContent"

const PremiumCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
PremiumCardFooter.displayName = "PremiumCardFooter"

export {
  PremiumCard,
  PremiumCardHeader,
  PremiumCardTitle,
  PremiumCardDescription,
  PremiumCardContent,
  PremiumCardFooter,
}

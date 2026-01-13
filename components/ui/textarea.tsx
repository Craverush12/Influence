import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  showCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText, 
    showCount = false,
    maxLength,
    value,
    id,
    ...props 
  }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const currentLength = typeof value === 'string' ? value.length : 0

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-3 text-sm transition-colors",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "resize-y",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          maxLength={maxLength}
          value={value}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex-1">
            {error && (
              <p id={`${textareaId}-error`} className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            
            {helperText && !error && (
              <p id={`${textareaId}-helper`} className="text-sm text-muted-foreground">
                {helperText}
              </p>
            )}
          </div>
          
          {showCount && maxLength && (
            <span className={cn(
              "text-sm text-muted-foreground ml-2",
              currentLength > maxLength * 0.9 && "text-warning",
              currentLength === maxLength && "text-destructive font-medium"
            )}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

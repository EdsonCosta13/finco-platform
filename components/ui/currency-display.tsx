import { cn } from "@/lib/utils"

interface CurrencyDisplayProps {
  value: number
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "success" | "warning" | "danger"
  className?: string
}

export function CurrencyDisplay({ value, size = "md", variant = "default", className }: CurrencyDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-2xl",
  }

  const variantClasses = {
    default: "text-gray-900",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  return (
    <span className={cn("font-mono font-semibold", sizeClasses[size], variantClasses[variant], className)}>
      {formatCurrency(value)}
    </span>
  )
}

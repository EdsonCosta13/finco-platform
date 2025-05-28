import { Banknote, TrendingUp } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  variant?: "default" | "white"
}

export function Logo({ size = "md", showText = true, variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  }

  const containerSizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  }

  const isWhite = variant === "white"

  return (
    <div className="flex items-center space-x-3">
      <div
        className={`relative ${containerSizeClasses[size]} rounded-xl ${isWhite ? "bg-white/20 backdrop-blur-sm" : "bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg"}`}
      >
        <div className="relative">
          <Banknote className={`${sizeClasses[size]} ${isWhite ? "text-white" : "text-white"}`} />
          <TrendingUp
            className={`absolute -bottom-0.5 -right-0.5 ${size === "lg" ? "h-4 w-4" : size === "md" ? "h-3 w-3" : "h-2 w-2"} ${isWhite ? "text-white/80" : "text-primary-200"}`}
          />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span
            className={`${textSizeClasses[size]} font-bold ${isWhite ? "text-white" : "text-gray-900"} tracking-tight`}
          >
            Finco
          </span>
          <span className={`text-xs ${isWhite ? "text-white/80" : "text-gray-500"} -mt-1 font-medium tracking-wide`}>
            CRÉDITO COLABORATIVO
          </span>
        </div>
      )}
    </div>
  )
}

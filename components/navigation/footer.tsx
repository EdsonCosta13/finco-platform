import { Logo } from "@/components/brand/logo"

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6 md:px-0">
          <Logo size="sm" />
          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2024 FinCo. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary-600 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-primary-600 transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-primary-600 transition-colors">
                Suporte
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-muted-foreground">Sistema Online</p>
          </div>
          <p className="text-sm text-muted-foreground">v1.0.0</p>
        </div>
      </div>
    </footer>
  )
}

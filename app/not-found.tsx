import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-light text-muted-foreground">404</h1>
          <h2 className="text-xl font-medium">Página não encontrada</h2>
          <p className="text-muted-foreground">O conteúdo que você procura não existe.</p>
        </div>

        <Link href="/">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Button>
        </Link>
      </div>
    </div>
  )
}

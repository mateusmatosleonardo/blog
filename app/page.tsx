import Link from "next/link";
import { postsMeta } from "@/lib/posts-meta";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <header className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-2xl font-light tracking-tight">Blog</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Artigos sobre tecnologia, desenvolvimento e o que estou explorando no
              momento
            </p>
          </div>
          <ThemeToggle />
        </header>

        <main className="space-y-12">
          {postsMeta.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/post/${post.slug}`} className="block">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-medium group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </main>

        <footer className="mt-24 pt-12 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © 2025 Mateus Leonardo. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}

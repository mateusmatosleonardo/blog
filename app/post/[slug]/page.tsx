import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  // Separar o conteúdo em blocos de texto e blocos de código
  const parts = post.content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <header className="flex items-center justify-between mb-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 px-0">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <ThemeToggle />
        </header>

        <article className="space-y-8">
          <div className="space-y-4">
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

            <h1 className="text-3xl font-light tracking-tight">{post.title}</h1>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="space-y-6 leading-relaxed">
              {parts.map((part, index) => {
                if (part.startsWith("```")) {
                  // Extrair o conteúdo do código sem as ``` e o tipo (ex: ts)
                  const codeContent = part.replace(/```(ts)?\n?/, "").replace(/```$/, "");
                  return (
                    <pre
                      key={index}
                      className="bg-gray-900/90 p-4 rounded text-sm text-white overflow-x-auto"
                    >
                      <code>{codeContent}</code>
                    </pre>
                  );
                } else {
                  // Para o texto normal, usar a sua lógica atual para separar parágrafos e títulos
                  return part.split("\n\n").map((paragraph, i) => {
                    if (paragraph.startsWith("# ")) {
                      return (
                        <h1
                          key={`${index}-${i}`}
                          className="text-2xl font-medium mt-12 mb-6 first:mt-0"
                        >
                          {paragraph.replace("# ", "")}
                        </h1>
                      );
                    }
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2
                          key={`${index}-${i}`}
                          className="text-xl font-medium mt-10 mb-4"
                        >
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3
                          key={`${index}-${i}`}
                          className="text-lg font-medium mt-8 mb-3"
                        >
                          {paragraph.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith("- ")) {
                      const items = paragraph
                        .split("\n")
                        .filter((line) => line.startsWith("- "));
                      return (
                        <ul key={`${index}-${i}`} className="space-y-2 ml-4">
                          {items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <span className="text-muted-foreground mt-2">•</span>
                              <span>
                                {item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
                              </span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.match(/^\d+\./)) {
                      const items = paragraph
                        .split("\n")
                        .filter((line) => line.match(/^\d+\./));
                      return (
                        <ol key={`${index}-${i}`} className="space-y-2 ml-4">
                          {items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <span className="text-muted-foreground mt-2">
                                {itemIndex + 1}.
                              </span>
                              <span>{item.replace(/^\d+\.\s/, "")}</span>
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p
                        key={`${index}-${i}`}
                        className="text-foreground leading-relaxed"
                      >
                        {paragraph.replace(/\*\*(.*?)\*\*/g, "$1")}
                      </p>
                    );
                  });
                }
              })}
            </div>
          </div>
        </article>

        <div className="flex items-center gap-6 mt-14">
          <Image
            src="/eu.png"
            width={65}
            height={65}
            alt="profile"
            className="rounded-full"
          />
          <div>
            <p className="text-xl font-bold">Escrito por Mateus Leonardo</p>
            <p className="text-sm font-light text-muted-foreground">
              Engenheiro de Software
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Ver todos os posts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

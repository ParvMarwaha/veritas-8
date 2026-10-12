import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles, getArticle } from '@/data/insights';
import { ArticleView } from '@/components/insights/ArticleView';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.kicker}: ${article.title} | Veritas`,
    description: article.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return <ArticleView slug={article.slug} />;
}

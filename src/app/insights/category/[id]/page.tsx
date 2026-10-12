import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { series } from '@/data/insights';
import { CategoryView } from '@/components/insights/CategoryView';

export function generateStaticParams() {
  return series.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = series.find((s) => s.id === id);
  if (!category) return {};
  return {
    title: `${category.title} | Insights | Veritas`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = series.find((s) => s.id === id);
  if (!category) notFound();

  return <CategoryView id={category.id} />;
}

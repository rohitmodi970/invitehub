import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BLOG_POSTS, getBlogPostBySlug } from '@/lib/blog/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  if (!post) return { title: 'Not Found | InviteHub.in' };

  return {
    title: `${post.title} | InviteHub.in Blog`,
    description: post.description,
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-black/60 transition hover:text-[var(--accent)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all articles
      </Link>

      <header className="mb-12 border-b border-[var(--border)] pb-8">
        <div className="mb-4 flex items-center gap-3 text-sm font-medium text-[var(--accent)]">
          <span>{post.category}</span>
          <span className="text-black/30">•</span>
          <span className="text-black/60">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg text-black/70">{post.description}</p>
        <div className="mt-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[var(--surface-soft)] flex items-center justify-center font-bold text-[var(--accent)] border border-[var(--border)]">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold">{post.author}</p>
            <p className="text-xs text-black/60">Content Team</p>
          </div>
        </div>
      </header>

      <div className="prose prose-lg prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[var(--accent)] hover:prose-a:text-[#6f2216] max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      
      <div className="mt-16 rounded-2xl bg-[var(--surface-soft)] p-8 text-center border border-[var(--border)]">
        <h3 className="text-2xl font-semibold">Ready to create your invitation?</h3>
        <p className="mt-2 text-black/70">Browse our collection of premium templates.</p>
        <Link
          href="/templates"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-white transition hover:bg-[#6f2216]"
        >
          Browse Templates
        </Link>
      </div>
    </div>
  );
}

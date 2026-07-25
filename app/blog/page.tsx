import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog/data';

export const metadata: Metadata = {
  title: 'Blog | InviteHub.in',
  description: 'Tips, trends, and guides for planning your events and creating the perfect invitations.',
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Event Planning & Invitation Guides
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
          Discover the latest trends, wording ideas, and tips for making your next event unforgettable.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-sm text-[var(--accent)] font-medium">
              <span>{post.category}</span>
              <span className="text-black/30">•</span>
              <span className="text-black/60">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h2 className="text-xl font-semibold leading-tight text-[var(--foreground)]">
              {post.title}
            </h2>
            <p className="text-sm leading-relaxed text-black/70 line-clamp-3">
              {post.description}
            </p>
            <div className="mt-auto pt-4 text-sm font-semibold text-[var(--accent)]">
              Read article →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';

/**
 * Legacy redirect: /i/[slug] → /e/[slug]
 * 
 * All existing shared invitation links continue to work.
 * The new canonical URL is /e/[slug].
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  redirect(`/e/${slug}`);
}

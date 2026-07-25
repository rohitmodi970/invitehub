export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-write-corporate-event-invitation',
    title: 'How to Write a Professional Corporate Event Invitation',
    description: 'Learn the essential elements of a corporate event invitation, from tone and structure to the information you absolutely must include.',
    date: '2026-07-25',
    author: 'InviteHub Team',
    category: 'Corporate',
    content: `
# How to Write a Professional Corporate Event Invitation

When inviting colleagues, clients, or industry partners to a corporate event, the invitation sets the tone for the entire gathering. Whether it's an annual summit, a product launch, or an end-of-year celebration, getting the wording right is crucial.

## 1. Start with a Clear Subject Line (for Email) or Headline (for Digital Cards)
Your invitees are busy. Make sure they know exactly what the invitation is for within the first glance. 
*Example: "You're Invited: Tech Innovators Summit 2026"*

## 2. Essential Information to Include
Every professional invitation must include the 5 Ws:
- **Who:** Who is hosting (Company Name) and who is invited (Is it plus-ones? Employees only?).
- **What:** The name and purpose of the event.
- **When:** Date and time (including time zones if it's a virtual or international event).
- **Where:** Full venue address, parking details, or a link for virtual events.
- **Why:** A brief note on what to expect (e.g., "Join us for an evening of networking and industry insights").

## 3. Don't Forget the Details
- **RSVP:** Give a clear deadline for RSVPs.
- **Dress Code:** Business casual? Black tie? Let your guests know so they feel comfortable.
- **Agenda:** If it's a multi-hour event, a brief schedule helps attendees plan their time.

## 4. Use a Professional Design
A beautifully designed digital card makes your event feel premium. Use platforms like InviteHub.in to choose a sleek, corporate-ready template, add your company logo, and share it instantly.
    `
  },
  {
    slug: 'top-kids-birthday-party-themes-2026',
    title: 'Top 5 Kids Birthday Party Themes for 2026',
    description: 'Planning a birthday party for your little one? Here are the top trending themes for kids\' birthdays this year.',
    date: '2026-07-20',
    author: 'InviteHub Team',
    category: 'Birthday',
    content: `
# Top 5 Kids Birthday Party Themes for 2026

Planning a birthday party is all about creating magical memories. This year, we're seeing a shift towards immersive, interactive, and colorful themes. Here are the top 5 kids birthday party themes for 2026:

## 1. Enchanted Forest / Woodland Creatures
Move over standard princesses; the enchanted forest is taking over. Think fairy lights, mushroom decorations, and woodland animal masks. It’s whimsical and perfect for outdoor or backyard parties.

## 2. Retro Arcade / Neon Glow
For slightly older kids (and nostalgic parents), neon glow parties are huge. Blacklights, neon tape, glow sticks, and arcade-style games make for an unforgettable, energetic celebration.

## 3. Mini Masterchef / Cooking Party
Interactive parties are highly requested. Set up stations where kids can decorate their own cupcakes, make personal pizzas, or mix colorful (and safe) mocktails. 

## 4. Outer Space Explorer
The universe is a timeless theme, but this year it's all about realistic astronaut vibes mixed with glowing stars and planetary decorations. 

## 5. Eco-Friendly / Nature Explorers
With a growing focus on sustainability, nature-themed parties where kids plant a small pot or go on a nature scavenger hunt are becoming incredibly popular.

**Ready to start planning?** 
Set the tone for your themed party with a beautiful, customized digital invitation from InviteHub.in.
    `
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

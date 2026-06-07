import Link from 'next/link';
import Image from 'next/image';
import { Heart, Mail } from 'lucide-react';

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#0f0c0a] text-white/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Image src="/elegant_logo_with_domain_written.png" alt="InviteHub.in" width={160} height={40} className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              Beautiful wedding invitation cards, designed and shared in minutes.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com/invitehubin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 transition-all"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://twitter.com/invitehubin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-blue-400/20 hover:text-blue-300 transition-all"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href="mailto:invitehub001@gmail.com"
                className="p-2 rounded-lg bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 transition-all"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Templates */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Templates</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Wedding Templates', href: '/templates?category=wedding' },
                { label: 'Traditional Indian', href: '/templates?category=traditional-indian' },
                { label: 'Modern Designs', href: '/templates?category=modern' },
                { label: 'Royal Themes', href: '/templates?category=royal' },
                { label: 'All Templates', href: '/templates' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Pricing', href: '/#pricing' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Get in Touch</h3>
            <p className="text-sm text-white/50 mb-3">
              Have a question or need help? We&apos;re here for you.
            </p>
            <a
              href="mailto:invitehub001@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              <Mail size={14} />
              invitehub001@gmail.com
            </a>
            <Link
              href="/contact"
              className="mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm font-medium transition-all border border-white/10 hover:border-white/20"
            >
              Send Feedback
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} InviteHub.in — Made with{' '}
            <Heart size={11} className="inline text-rose-400 fill-rose-400" /> in India
          </p>
          <p className="text-xs text-white/25">
            Free to design · Pay only when you download
          </p>
        </div>
      </div>
    </footer>
  );
}

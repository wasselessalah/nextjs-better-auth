import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block text-2xl font-bold tracking-tight mb-4">
              Better<span className="text-primary">Auth</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              A comprehensive, production-ready authentication starter using the Next.js App Router, Better Auth, and MongoDB. Secure by default.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/wasselessalah" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links - Product */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/settings/security" className="hover:text-primary transition-colors">Security Center</Link></li>
              <li><Link href="/help" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="/help" className="hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Links - Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="https://better-auth.com" target="_blank" className="hover:text-primary transition-colors">Better Auth Docs</Link></li>
              <li><Link href="https://nextjs.org/docs" target="_blank" className="hover:text-primary transition-colors">Next.js Guide</Link></li>
              <li><Link href="https://ui.shadcn.com" target="_blank" className="hover:text-primary transition-colors">shadcn/ui</Link></li>
              <li><Link href="https://tailwindcss.com" target="_blank" className="hover:text-primary transition-colors">Tailwind CSS</Link></li>
            </ul>
          </div>

          {/* Links - Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} BetterAuth Starter. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>by <a href="https://github.com/wasselessalah" target="_blank" className="hover:text-foreground font-medium transition-colors">Essalah Wassel</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}

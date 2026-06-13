"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rss,
  Share2,
  Terminal,
  Zap,
  Sparkles,
} from "lucide-react";
import { NAV_LINKS, SIGNATURE_LINE, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: "#", icon: Share2, label: "Facebook" },
  { href: "#", icon: Globe, label: "Instagram" },
  { href: "#", icon: Rss, label: "Twitter" },
  { href: "#", icon: MessageCircle, label: "YouTube" },
];

export default function Footer() {
  const [tapCount, setTapCount] = useState(0);
  const lastTapRef = useRef(0);

  const handleLogoTap = () => {
    // Secret trigger: tap logo 5 times within 3 seconds
    const now = Date.now();
    if (now - lastTapRef.current > 3000) {
      setTapCount(1);
    } else {
      const nextCount = tapCount + 1;
      setTapCount(nextCount);
      if (nextCount >= 5) {
        setTapCount(0);
        // Dispatch custom event that AdminGate can listen for
        window.dispatchEvent(new CustomEvent("open-admin-gate"));
      }
    }
    lastTapRef.current = now;
  };

  return (
    <footer className="border-t border-white/10 bg-charcoal-light">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3
              className="cursor-pointer text-lg font-semibold text-gold"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  handleLogoTap();
                }
              }}
            >
              {SITE_NAME}
            </h3>
            <p className="text-sm leading-relaxed text-body-muted">{SITE_TAGLINE}</p>
            <p className="text-sm leading-relaxed text-white/65">
              Nurturing leaders of tomorrow with discipline, integrity, and academic
              excellence in the heart of DHA, Lahore.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-body-muted transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-body-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>F9RP+93V, Faisal Ghuman Rd, Askari 8, Lahore</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span>+92 42 37164886</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-gold" />
                <span>lges.edu.pk</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    "border border-white/10 bg-charcoal text-white/60",
                    "transition-all hover:border-gold/40 hover:text-gold"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-8 text-center">
        <div className="mb-4">
          <div className="relative inline-flex items-center gap-3 justify-center">
            {/* Aura/glow effect */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="w-72 h-24 bg-gradient-to-r from-blue-600/30 via-purple-600/40 to-red-600/30 blur-2xl rounded-full animate-pulse" />
              <div className="absolute w-48 h-16 bg-gradient-to-r from-red-500/20 via-purple-500/30 to-blue-500/20 blur-xl rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            </div>

            {/* Japanese wind pattern bg */}
            <div className="absolute inset-0 -z-10 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
            }} />

            {/* Icons */}
            <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
            <Terminal className="h-6 w-6 text-cyan-400" />
            
            {/* Your name */}
            <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              TBARIAZ
            </h3>

            <Sparkles className="h-6 w-6 text-purple-400 animate-ping" style={{ animationDuration: '1.5s' }} />
            <Zap className="h-6 w-6 text-red-400 animate-pulse" />
          </div>
        </div>
        <p className="text-xs text-gold-light/90 sm:text-sm">{SIGNATURE_LINE}</p>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { MotionToggle } from "@/components/motion/MotionProvider";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-page">
        <div className="footer-main">
          <Link href="/" className="footer-brand">
            <Image
              src={SITE.images.logo}
              alt="Fee The Producer LLC — Music Production"
              width={120}
              height={120}
            />
            <span>Sound. Soul. Signature.</span>
          </Link>
          <div className="footer-links">
            <Link href="/streaming">The music</Link>
            <Link href="/#live-performance">Live performance</Link>
            <Link href="/beats">Production</Link>
            <Link href="/merch">Merch store</Link>
            <Link href="/about">About Fee</Link>
            <Link href="/licensing">Licensing inquiries</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-links">
            <a
              href={SITE.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube ↗
            </a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}
          </p>
          <MotionToggle />
          <p>Made with intention.</p>
        </div>
      </div>
    </footer>
  );
}

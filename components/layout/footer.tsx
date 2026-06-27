import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

const supportLinks = [
  { title: "My Orders", href: "/orders" },
  { title: "Cart", href: "/cart" },
  { title: "Shipping Info", href: "/contact" },
  { title: "Returns Policy", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-muted/20 mt-8">
      <div className="mycontainer py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Cartly" width={32} height={32} />
              <span className="font-semibold text-lg">Cartly</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your trusted destination for quality products, seamless checkout,
              and exceptional customer service.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-black/10 bg-background text-muted-foreground hover:text-primary hover:border-primary/20 duration-150"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground duration-150"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Customer Support
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground duration-150"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-muted-foreground text-xs text-center">
          &copy; {new Date().getFullYear()} Cartly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

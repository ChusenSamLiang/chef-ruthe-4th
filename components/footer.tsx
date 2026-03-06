"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react"

const quickLinks = [
  { label: "Private Chef NYC & Queens", href: "#services" },
  { label: "Ozone Park Luxury Catering", href: "#services" },
  { label: "Bespoke Meal Prep Services", href: "#services" },
  { label: "In-Home Dining Experience", href: "#menu" },
  { label: "Book a Consultation", href: "#booking" },
]

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/chefruthe4th", label: "Instagram" },
  // { icon: Facebook, href: "https://facebook.com/chefruthe4th", label: "Facebook" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="font-serif text-2xl font-bold inline-block mb-4">
              <span className="text-primary">Chef</span> Ruthe 4th
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Elevating home dining with bespoke culinary experiences. From intimate dinners to grand celebrations.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href="mailto:chef@chefruthe4th.com" className="hover:text-primary transition-colors">
                  chefruthe4th@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-500">(347) 300-3944</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Serving Queens, Brooklyn & the NYC Metro Area</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-bold mb-4">Get Seasonal Menus</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe for exclusive seasonal menus, chef tips, and special offers.
            </p>
            {isSubscribed ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-primary text-sm"
              >
                Thank you for subscribing!
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border"
                  required
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                >
                  Join
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Chef Ruthe 4th. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

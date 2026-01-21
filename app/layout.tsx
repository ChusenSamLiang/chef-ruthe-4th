import React from "react"
import type { Metadata, Viewport } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });
const _inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Chef Ruthe 4th | Luxury Private Chef & Bespoke Catering',
  description: 'Experience elevated culinary experiences in your own kitchen. From intimate private dinners to luxury meal prep, Chef Ruthe 4th brings the restaurant to you. Book your bespoke catering consultation today.',
  keywords: ['private chef', 'bespoke catering', 'luxury meal prep', 'private dining', 'personal chef', 'gourmet catering'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased text-white bg-[#1a1a1a]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "FoodEstablishment"],
              "name": "Chef Ruthe 4th",
              "image": "https://chefruthe4th.com/logo.png",
              "@id": "https://chefruthe4th.com",
              "url": "https://chefruthe4th.com",
              "telephone": "+1234567890",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Culinary Ave",
                "addressLocality": "Los Angeles",
                "addressRegion": "CA",
                "postalCode": "90001",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 34.0522,
                "longitude": -118.2437
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "09:00",
                "closes": "21:00"
              },
              "servesCuisine": "Modern American, Luxury, Bespoke",
              "priceRange": "$$$",
              "hasMenu": "https://chefruthe4th.com/#menu",
              "offers": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Private Chef Services",
                    "description": "Bespoke in-home dining experiences."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Luxury Catering",
                    "description": "High-end catering for exclusive events."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Weekly Meal Prep",
                    "description": "Customized gourmet meal preparation."
                  }
                }
              ]
            })
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

// app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  title: 'Alain Quentin - Video Editor & Storyteller',
  description: 'Professional video editor specializing in commercials, documentaries, and music videos. Creating compelling narratives through film.',
  keywords: 'video editor, filmmaker, storyteller, commercial, documentary, music videos, post-production',
  authors: [{ name: 'Alain Quentin' }],
  creator: 'Alain Quentin',
  openGraph: {
    title: 'Alain Quentin - Video Editor & Storyteller',
    description: 'Professional video editor specializing in commercials, documentaries, and music videos.',
    url: 'https://alainquentin.com',
    siteName: 'Alain Quentin Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alain Quentin - Video Editor Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alain Quentin - Video Editor & Storyteller',
    description: 'Professional video editor specializing in commercials, documentaries, and music videos.',
    images: ['/og-image.jpg'],
    creator: '@alainquentin',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#D4AF37' },
    { media: '(prefers-color-scheme: dark)', color: '#D4AF37' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://player.vimeo.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href="/fonts/Inter-Bold.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//player.vimeo.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Alain Quentin",
              "jobTitle": "Video Editor & Storyteller",
              "description": "Professional video editor specializing in commercials, documentaries, and music videos.",
              "url": "https://alainquentin.com",
              "image": "https://alainquentin.com/profile-image.jpg",
              "sameAs": [
                "https://instagram.com/alainquentin",
                "https://vimeo.com/alainquentin",
                "https://linkedin.com/in/alainquentin",
                "https://twitter.com/alainquentin"
              ],
              "knowsAbout": [
                "Video Editing",
                "Color Grading", 
                "Sound Design",
                "Motion Graphics",
                "Commercial Production",
                "Documentary Filmmaking"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Video Editor",
                "occupationLocation": {
                  "@type": "City",
                  "name": "Los Angeles, CA"
                }
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Main content */}
        <div id="main-content">
          {children}
        </div>
        
        {/* Analytics scripts would go here */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
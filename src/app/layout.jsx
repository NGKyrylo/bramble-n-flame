import ClientWrapper from "@/components/ClientWeapper/ClientWrapper";
import "./globals.css";

export const metadata = {
  title: 'Bramble & Flame',
  keywords: 'soy wax candles, handmade candles, vegan candles, cruelty-free candles, decorative candles, Derbyshire candles, natural home decor, Bramble and Flame',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="B&F" />
        <link rel="preload" as="image" href="/images/MainPageImg-2548.webp" media="(min-width: 1024px)" type="image/webp" />
        <link rel="preload" as="image" href="/images/MainPageImg-1024.webp" media="(max-width: 1023px)" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Bramble & Flame",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ashbourne",
                addressCountry: "UK",
              },
              description:
                "Handcrafted soy wax candles — vegan, cruelty-free, and inspired by the heart of Derbyshire.",
              url: "https://bramble-n-flame.co.uk/",
              image: "https://bramble-n-flame.co.uk/images/MiniLogo.webp",
              sameAs: [
                "https://www.instagram.com/bramble_and_flame/",
                "https://www.facebook.com/people/Bramble-Flame/61579232468198/",
              ],
            }),
          }}
        />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17468413037"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17468413037');
          `,
        }} />
      </head>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

import './globals.css';
import './index.css';
import Navigation from "../components/layouts/Navigation";
import Footer from '../components/layouts/Footer';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default async function RootLayout({ children }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query {
                    siteLogo
                }
            `,
        }),
    });

    const result = await res.json();
    const siteLogo = result.data?.siteLogo || null;

    return (
        <html lang="en">
            <body>
                <Navigation siteLogo={siteLogo} />
                    {children}
                <Footer />
            </body>
        </html>
    );
}

'use client';
import './globals.css';
import './index.css';
import { Lato } from 'next/font/google';
import Navigation from "../components/layouts/Navigation";
import Footer from '../components/layouts/Footer';
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

export default function RootLayout({ children }) {
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body className={lato.variable}>
          <Navigation />
          {children}
          <Footer />
        </body>
      </html>
    </ApolloProvider>
  );
}

'use client';
import './scss/base/__index.scss'; 
import './globals.css';
import './index.css';
import { usePathname } from "next/navigation";
import { Lato } from 'next/font/google';
import Navigation from "../components/layouts/Navigation";
import Footer from '../components/layouts/Footer';
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import client from "../lib/apolloClient";
import PageHeroWrapper from '../components/layouts/PageHeroWrapper';

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
          <PageHeroWrapper />
          {children}
          <Footer />
        </body>
      </html>
    </ApolloProvider>
  );
}

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gql, useQuery } from "@apollo/client";
import styles from './style.module.scss';

// Define the GraphQL query to fetch siteLogo
const GET_SITE_LOGO = gql`
  query GetSiteLogo {
    siteLogo
  }
`;

const NavLinks = [
  { id: 1, name: 'Home', path: '/' },
  { id: 3, name: 'Lessons', path: '/lessons' },
  { id: 2, name: 'Blog', path: '/blog' }
];

export default function Navigation() {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;

  // Fetch siteLogo with Apollo's useQuery
  const { data, loading, error } = useQuery(GET_SITE_LOGO);

  if (loading) return null; // or add a loading spinner if preferred
  if (error) return <p>Error loading logo</p>;

  const siteLogo = data.siteLogo || '/fallback-logo.png'; // Optional fallback

  return (
    <nav>
      <div className="navigation">
        <div className={`${styles.navigation__inner} container`}>
          <Link href="/">
            <img src={siteLogo} alt="Site Logo" />
          </Link>
          <ul>
            {NavLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.path}
                  className={isActive(link.path) ? 'active' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

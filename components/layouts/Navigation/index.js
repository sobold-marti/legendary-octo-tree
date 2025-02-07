'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gql, useQuery } from "@apollo/client";
import styles from './style.module.scss';

const GET_NAVIGATION_MENU = gql`
  query GetNavigationMenu {
    siteLogo
    menu(id: "header-navigation", idType: SLUG) {
      menuItems {
        nodes {
          id
          label
          url
        }
      }
    }
  }
`;

export default function Navigation() {
  const pathname = usePathname() + '/'; // Add slash at the end of pathname to match
  const isActive = (url) => {
    // Check if the URL is relative
    if (url.startsWith('/')) {
      // If it's relative, compare with the current pathname
      return pathname === url;
    }

    // Handle full URLs: remove the domain part, then compare
    const sanitizedUrl = url.replace(process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL, '');
    return pathname === sanitizedUrl;
  };

  // Fetch siteLogo with Apollo's useQuery
  const { data, loading, error } = useQuery(GET_NAVIGATION_MENU);

  if (loading) return null; // or add a loading spinner if preferred
  if (error) return <p>Error loading logo</p>;

  const siteLogo = data.siteLogo || '/fallback-logo.png'; // Optional fallback
  const menuItems = data.menu?.menuItems?.nodes || [];

  const sanitizeUrl = (url) => {
    // If the URL is relative (starts with '/'), return it as is
    if (url.startsWith('/')) {
      return url;
    }

    // Otherwise, handle full URLs
    const wpDomain = process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL || '';
    return url.replace(wpDomain, ''); // Strip out the WordPress domain if needed
  };

  return (
    <nav>
      <div className="navigation">
        <div className={`${styles.navigation__inner} container`}>
          <Link href="/">
            <img src={siteLogo} alt="Site Logo" />
          </Link>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={sanitizeUrl(item.url)}
                  className={isActive(item.url) ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

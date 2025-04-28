'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({siteLogo, menuItems}) {
  console.log(menuItems)
  const [navMenu, setNavMenu] = useState(false);
  const pathname = usePathname() + '/'; // Add slash at the end of pathname to match

  function handleMenuToggle() {
    setNavMenu(prevMenu => !prevMenu);
  }

  useEffect(() => {
    setNavMenu(false);
  }, [pathname]);

  // const menuClass = navMenu ? 'block' : 'hidden';
  const menuClass = navMenu ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none';
  
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

  const sanitizeUrl = (url) => {
    // If the URL is relative (starts with '/'), return it as is
    if (url.startsWith('/')) {
      return url;
    }

    // Otherwise, handle full URLs
    const wpDomain = process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL || '';
    return url.replace(wpDomain, ''); // Strip out the WordPress domain if needed
  };

  const buttonText = 'Menu';

  return (
    <>
      <nav>
        <div className="navigation">
          <div className="flex justify-between items-center my-0 mx-auto h-32 container py-1 px-4">
            <Link href="/">
              <img className="w-[10rem]" src={siteLogo} alt="Site Logo" />
            </Link>
            <ul className="hidden md:flex">
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
            <div className="md:hidden">
                <button onClick={handleMenuToggle} className="border-2 rounded-3xl py-2 px-4 relative cursor-pointer">Menu</button>
            </div>
          </div>
        </div>
      </nav>
      <nav className={`nav-mobile bg-blue-100 items-center fixed top-[8rem] z-[1000] w-full h-full transition-all duration-300 ease-in-out md:hidden ${menuClass}`}>
          <div className="mx-auto flex items-center w-full h-full">
              <div className="flex flex-col items-center justify-center align-items-center space-y-5 w-full text-center mb-50">
                <ul className="flex-col space-y-5 justify-end text-2xl">
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
    </>
  );
}

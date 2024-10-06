'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './style.module.scss';

const NavLinks = [
	{ id: 1, name: 'Home', path: '/' },
	{ id: 3, name: 'Lessons', path: '/lessons' },
	{ id: 2, name: 'Blog', path: '/blog' }
];

export default function Navigation({siteLogo}) {
	const pathname = usePathname();
	const isActive = (path) => path === pathname;

	return (
		<nav>
			<div className="navigation">
				<div className={`${styles.navigation__inner} container`}>
					<Link href="/">
						<img src={siteLogo} />
					</Link>
					<ul>
						{NavLinks.map((link) => {
							return (
								<li key={link.id}>
									<Link
										href={link.path}
										className={isActive(link.path) ? 'active' : ''}
									>
										{link.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</nav>
	);
};

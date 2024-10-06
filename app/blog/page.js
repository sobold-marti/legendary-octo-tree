import Link from 'next/link';
import '../index.css';

async function getPosts() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts`
	);
	const posts = await response.json();
	return posts;
}

export default async function BlogPage() {
	const posts = await getPosts();

	return (
		<div className="blog-page">
			<div className="container">
				<h2 className="hover:text-sky-700">All Blog Posts</h2>
				<p>All blog posts are fetched from WordPress via the WP REST API.</p>
				<div className="posts">
					{posts.map((post) => {
						return (
							<Link href={`/blog/${post.id}`} className="post" key={post.id}>
								<h3>{post.title.rendered}</h3>
								<div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

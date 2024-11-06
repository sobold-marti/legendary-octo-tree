import styles from './page.module.scss';
import Loading from '../../../components/layouts/Loading';

export async function generateStaticParams() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts`
	);
	const posts = await response.json();

	return posts.map((post) => ({
		postId: post.id.toString(),
	}));
}

async function getSinglePost(postId) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postId}`
	);
	const post = await response.json();
	return post;
}

const page = async ({ params }) => {
	const post = await getSinglePost(params.postId);

	if (!post) {
		return <Loading />
	}

	return (
		<div className="single-blog-page">
			<div className="container">
				<h2 className={styles.singleBlogPage__title}>{post.title.rendered}</h2>
				<div className="blog-post">
					<div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
				</div>
			</div>
		</div>
	);
};

export default page;

// blog/page.js
'use client';

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import styles from './style.module.scss';

// Define GraphQL query for fetching all posts
const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        excerpt
        slug
      }
    }
  }
`;

export default function BlogPage() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts = data.posts.nodes;

  return (
    <div className={styles.blogPage}>
      <div className="container mx-auto px-4">
        <h2>All Blog Posts</h2>
        <p>All blog posts are fetched from WordPress via the GraphQL API.</p>
        <div className={styles.blogPage__posts}>
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} className={styles.blogPage__post} key={post.id}>
              <h3>{post.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

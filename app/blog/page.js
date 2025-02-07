import { gql } from '@apollo/client';
import Link from 'next/link';
import styles from './style.module.scss';
import client from '../../lib/apolloClient';

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

async function getPosts() {
  const { data } = await client.query({
    query: GET_POSTS
  })

  return data.posts.nodes;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className={styles.blogPage}>
      <div className="container mx-auto px-4">
        <h2>All Blog Posts</h2>
        <p>All blog posts are fetched from WordPress via the GraphQL API.</p>
        <div className={styles.blogPage__posts}>
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} className={styles.blogPage__post} key={post.id}>
              <h3>{post.title}</h3>
              <div dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

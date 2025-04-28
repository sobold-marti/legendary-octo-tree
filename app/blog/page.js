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

function trimExcerpt(html, wordLimit = 15) {
  if (!html) return '';

  // Remove HTML tags
  const text = html.replace(/<[^>]+>/g, '');

  // Split into words
  const words = text.trim().split(/\s+/);

  // Limit to `wordLimit` words
  const trimmed = words.slice(0, wordLimit).join(' ');

  return trimmed + (words.length > wordLimit ? '...' : '');
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className={styles.blogPage}>
      <div className="container mx-auto px-4">
        <h2>All Blog Posts</h2>
        <p>All blog posts are fetched from WordPress via the GraphQL API.</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} className={styles.blogPage__post} key={post.id}>
              <h3 className="md:break-word break-all">{post.title}</h3>
              <div>{trimExcerpt(post.excerpt)}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

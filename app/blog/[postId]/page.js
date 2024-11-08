import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';
import SinglePostContent from './singlePostContent';

// GraphQL query to get all post slugs for generating paths
const GET_POSTS_IDS = gql`
  query GetPostsIds {
    posts {
      nodes {
        slug
      }
    }
  }
`;

export async function generateStaticParams() {
  const { data } = await client.query({
    query: GET_POSTS_IDS,
  });

  return data.posts.nodes.map((post) => ({
    postId: post.slug,
  }));
}

export default function Page({ params }) {
  return <SinglePostContent slug={params.postId} />;
}

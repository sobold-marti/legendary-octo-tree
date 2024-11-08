// blog/[postId]/singlePostContent.js
'use client';

import { gql, useQuery } from '@apollo/client';
import Loading from '../../../components/layouts/Loading';
import styles from './style.module.scss';

// GraphQL query to fetch a single post by its slug
const GET_SINGLE_POST = gql`
  query GetSinglePost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
    }
  }
`;

export default function SinglePostContent({ slug }) {
  const { loading, error, data } = useQuery(GET_SINGLE_POST, {
    variables: { slug },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const post = data.post;

  return (
    <div className={styles.singleBlogPage}>
      <div className="container mx-auto px-4">
        <h2 className={styles.singleBlogPage__heading}>{post.title}</h2>
        <div className="blog-post">
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      </div>
    </div>
  );
}

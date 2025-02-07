import client from '../../../lib/apolloClient';
import { gql } from '@apollo/client';
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

async function getPost(slug) {
  const { data } = await client.query({
    variables: { slug },
    query: GET_SINGLE_POST
  })

  return data.post;
}

export default async function SinglePostContent({slug}) {
  const post = await getPost(slug);

  return (
    <div className={styles.singleBlogPage}>
      <div className="container mx-auto px-4">
        <h2 className={styles.singleBlogPage__heading}>{post.title}</h2>
        <div className="blog-post">
          <div dangerouslySetInnerHTML={{__html: post.content}}></div>
        </div>
      </div>
    </div>
  );
}

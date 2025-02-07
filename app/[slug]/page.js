import { gql } from '@apollo/client';
import client from '../../lib/apolloClient';
import BlocksRenderer from '../../components/blocks/BlocksRenderer';

const GET_ALL_PAGES = gql`
    query GetAllPages {
        pages {
            nodes {
                slug
            }
        }
    }
`;

export async function generateStaticParams() {
    const { data } = await client.query({
        query: GET_ALL_PAGES,
    });

    return data?.pages?.nodes.map((page) => ({
        slug: page.slug, // Slug for dynamic routes
    }));
}

export default function Page({ params }) {
    return <BlocksRenderer slug={params.slug} />;
}

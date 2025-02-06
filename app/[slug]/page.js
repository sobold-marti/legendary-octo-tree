import BlocksRenderer from '../../components/blocks/BlocksRenderer';

export async function generateStaticParams() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `
                query GetAllPages {
                    pages {
                        nodes {
                            slug
                        }
                    }
                }
            `,
        }),
    });

    const { data } = await response.json();

    return data.pages.nodes.map((page) => ({
        slug: page.slug, // Slug for dynamic routes
    }));
}

export default function Page({ params }) {
    return <BlocksRenderer slug={params.slug} />;
}

import ChildLessonContent from './ChildLessonContent';

export async function generateStaticParams() {
    // Fetch all lessons with their slugs and child slugs
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query GetLessonsWithChildren {
                    lessons {
                        nodes {
                            slug
                            children {
                                nodes {
                                    slug
                                }
                            }
                        }
                    }
                }
            `,
        }),
    });

    const json = await res.json();
    const lessons = json.data.lessons.nodes;

    // Generate static paths for both parent and child slugs
    let paths = [];
    lessons.forEach((lesson) => {
        lesson.children.nodes.forEach((child) => {
            paths.push({
                slug: lesson.slug,       // Parent slug
                childSlug: child.slug,   // Child slug
            });
        });
    });

    return paths;
}

export default function ChildLessonPage({ params }) {
    const { slug, childSlug } = params;

    return (
        <ChildLessonContent slug={slug} childSlug={childSlug} />
    );
}

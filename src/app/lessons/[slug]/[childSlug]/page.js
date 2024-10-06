import Text from "@/app/components/blocks/Text";

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

export default async function ChildLessonPage({ params }) {
    const { slug, childSlug } = params;

    // Fetch data for the parent lesson and its children
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query GetLessonWithChildren($slug: ID!) {
                lesson(id: $slug, idType: URI) {
                    title
                    content
                    blocks {
                        __typename
                        ... on CustomTextBlock {
                            attributes {
                                headingTb
                                textTb
                            }
                        }
                    }
                    children {
                        nodes {
                            ... on Lesson {
                                title
                                content
                                blocks {
                                    __typename
                                    ... on CustomTextBlock {
                                        attributes {
                                            headingTb
                                            textTb
                                        }
                                    }
                                }
                                slug
                            }
                        }
                    }
                }
            }            
            `,
            variables: { slug, childSlug },
        }),
    });

    const result = await res.json();

    // Check if the parent lesson exists
    if (!result.data || !result.data.lesson) {
        return <div>No parent lesson found.</div>;
    }

    // Find the specific child lesson based on the childSlug
    const parentLesson = result.data.lesson;
    const childLesson = parentLesson.children.nodes.find(child => child.slug === childSlug);

    if (!childLesson) {
        return <div>No child lesson found for the provided slug.</div>;
    }

    // Extract content and blocks for parent and child
    const parentTextBlock = parentLesson.blocks?.find(block => block.__typename === 'CustomTextBlock');
    const { headingTb: parentHeading, textTb: parentText } = parentTextBlock?.attributes || {};

    const childTextBlock = childLesson.blocks?.find(block => block.__typename === 'CustomTextBlock');
    const { headingTb: childHeading, textTb: childText } = childTextBlock?.attributes || {};

    return (
        <div className="container">
            {/* Parent Content */}
            <div className="parent-content">
                <h1>{parentLesson.title} (Parent)</h1>
                <Text heading={parentHeading} text={parentText} />
            </div>

            {/* Child Content */}
            <div className="child-content">
                <h1>{childLesson.title} (Child)</h1>
                <Text heading={childHeading} text={childText} />
            </div>
        </div>
    );
}

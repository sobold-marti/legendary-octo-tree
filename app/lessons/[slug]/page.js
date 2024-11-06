import LessonContent from "./LessonContent";

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query GetAllLessons {
                    lessons {
                        nodes {
                            slug
                        }
                    }
                }
            `,
        }),
    });

    const json = await res.json();
    const lessons = json?.data?.lessons?.nodes || [];

    return lessons.map((lesson) => ({
        slug: lesson.slug,
    }));
}

export default function LessonPage({ params }) {
    const { slug } = params;

    return (
        <div>
            <LessonContent slug={slug} />
        </div>
    );
}

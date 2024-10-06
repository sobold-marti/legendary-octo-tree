export default async function LessonsPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query GetAllLessons {
                    lessons {
                        nodes {
                            title
                            slug
                        }
                    }
                }
            `,
        }),
    });

    const json = await res.json();
    const lessons = json.data.lessons.nodes;

    return (
        <div className="container">
            <h1>Lessons Overview</h1>
            <ul>
                {lessons.map((lesson) => (
                    <li key={lesson.slug}>
                        <a href={`/lessons/${lesson.slug}`}>
                            {lesson.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

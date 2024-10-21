import Link from "next/link";
import styles from "./style.module.scss";

export default async function LessonsPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query GetAllLessons {
                lessons(where: { parentIn: [null] }) {
                  nodes {
                    ... on Lesson {
                      title
                      slug
                      children {
                        nodes {
                          ... on Lesson {
                            title
                            slug
                            children {
                              nodes {
                                ... on Lesson {
                                  title
                                  slug
                                }
                              }
                            }
                          }
                        }
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
    const parentLessons = lessons.filter(lesson => !lesson.parent);

    return (
        <div className="lessons-overview__container container">
            <h1>Lessons Overview</h1>
            <ul className={`${styles.lessonsOverview__parentList}`}>
                {parentLessons.map((lesson) => (
                    <li key={lesson.slug}>
                        <Link href={`/lessons/${lesson.slug}`}>
                            {lesson.title}
                        </Link>
                        {lesson.children.nodes.length > 0 && (
                            <ul className={`${styles.lessonsOverview__childrenList}`}>
                                {lesson.children.nodes.map((childLesson) => (
                                    <li key={childLesson.slug}>
                                        <Link href={`/lessons/${lesson.slug}/${childLesson.slug}`}>
                                            {childLesson.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

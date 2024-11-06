'use client';
import Link from "next/link";
import styles from "./style.module.scss";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_LESSONS = gql`
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
`;

export default function LessonsPage() {
  const { data, loading, error } = useQuery(GET_ALL_LESSONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const lessons = data?.lessons?.nodes || [];

  return (
    <div className="lessons-overview__container container">
      <h1>Lessons Overview</h1>
      <ul className={`${styles.lessonsOverview__parentList}`}>
        {lessons.map((lesson) => (
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
                    {childLesson.children.nodes.length > 0 && (
                      <ul className={`${styles.lessonsOverview__childrenList}`}>
                        {childLesson.children.nodes.map((grandChildLesson) => (
                          <li key={grandChildLesson.slug}>
                            <Link href={`/lessons/${lesson.slug}/${childLesson.slug}/${grandChildLesson.slug}`}>
                              {grandChildLesson.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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

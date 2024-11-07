'use client';
import Link from "next/link";
import styles from "./style.module.scss";
import { gql, useQuery } from "@apollo/client";
import Loading from "../../components/layouts/Loading";

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

  if (loading) {
      return (
          <Loading />
      );
  }

  if (error) {
    return (
        <div className="container">
            <p>Error: {error.message}</p>
        </div>
    );
  }

  const lessons = data?.lessons?.nodes || [];

  return (
    <div className={`${styles.lessonsOverview}`}>
      <div className="lessons-overview__container container mx-auto px-4">
        <h1 className={`${styles.lessonsOverview__heading}`}>Lessons Overview</h1>
        <ul className="list-style">
          {lessons.map((lesson) => (
            <li key={lesson.slug}>
              <Link href={`/lessons/${lesson.slug}`}>
                {lesson.title}
              </Link>
              {lesson.children.nodes.length > 0 && (
                <ul className="list-style">
                  {lesson.children.nodes.map((childLesson) => (
                    <li key={childLesson.slug}>
                      <Link href={`/lessons/${lesson.slug}/${childLesson.slug}`}>
                        {childLesson.title}
                      </Link>
                      {childLesson.children.nodes.length > 0 && (
                        <ul className="list-style">
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
    </div>
  );
}

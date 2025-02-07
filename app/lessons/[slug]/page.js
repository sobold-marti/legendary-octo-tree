import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';
import LessonContent from "./LessonContent";

const GET_ALL_LESSONS = gql`
    query GetAllLessons {
        lessons {
            nodes {
                slug
            }
        }
    }
`;

export async function generateStaticParams() {
    const { data } = await client.query({
        query: GET_ALL_LESSONS,
    });

    const lessons = data?.lessons?.nodes || [];

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

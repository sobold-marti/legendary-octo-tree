import { gql } from '@apollo/client';
import client from '../../../../lib/apolloClient';
import ChildLessonContent from './ChildLessonContent';

const GET_ALL_LESSONS_WITH_CHILDREN = gql`
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
`;

export async function generateStaticParams() {
    // Fetch all lessons with their slugs and child slugs    
    const { data } = await client.query({
        query: GET_ALL_LESSONS_WITH_CHILDREN,
    });

    const lessons = data.lessons.nodes;

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

'use client';
import Text from "../../../../components/blocks/Text";
import Loading from "../../../../components/layouts/Loading";
import { gql, useQuery } from "@apollo/client";
import styles from './style.module.scss';

const GET_LESSON_WITH_CHILDREN = gql`
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
`;

export default function ChildLessonPage({ slug, childSlug }) {
    const { data, loading, error } = useQuery(GET_LESSON_WITH_CHILDREN, {
        variables: { slug, childSlug }
    });

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

    // Check if the parent lesson exists
    if (!data || !data.lesson) {
        return <div>No parent lesson found.</div>;
    }

    // Find the specific child lesson based on the childSlug
    const parentLesson = data.lesson;
    const lessonSlug = parentLesson.children.nodes[0].slug;
    const childLesson = parentLesson.children.nodes.find(child => child.slug === childSlug);

    if (!childLesson) {
        return <div className="container">No child lesson found for the provided slug.</div>;
    }

    // Extract content and blocks for parent and child
    const parentTextBlock = parentLesson.blocks?.find(block => block.__typename === 'CustomTextBlock');
    const { headingTb: parentHeading, textTb: parentText } = parentTextBlock?.attributes || {};

    const childTextBlock = childLesson.blocks?.find(block => block.__typename === 'CustomTextBlock');
    const { headingTb: childHeading, textTb: childText } = childTextBlock?.attributes || {};

    return (
        <div className={`${lessonSlug} ${styles.childLesson}`}>
            {/* Parent Content */}
            <div className={`${styles.childLesson__parentContent} parent-content`}>
                <h1>{parentLesson.title} (Parent)</h1>
                <Text heading={parentHeading} text={parentText} />
            </div>

            {/* Child Content */}
            <div className={`${styles.childLesson__childContent} child-content`}>
                <h1>{childLesson.title} (Child)</h1>
                <Text heading={childHeading} text={childText} />
            </div>
        </div>
    );
}

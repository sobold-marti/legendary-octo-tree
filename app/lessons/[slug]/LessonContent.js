'use client';
import Link from "next/link";
import Text from "../../../components/blocks/Text";
import { gql, useQuery } from "@apollo/client";

const GET_LESSON = gql`
    query GetLesson($slug: ID!) {
        lesson(id: $slug, idType: URI) {
            title
            content
            slug
            blocks {
                __typename
                ... on CustomTextImageBlock {
                    attributes {
                        heading
                        text
                        imageUrl
                    }
                }
                ... on CustomTextBlock {
                    attributes {
                        headingTb
                        textTb
                    }
                }
            }
        }
    }
`;

export default function LessonContent({ slug }) {
    const { data, loading, error } = useQuery(GET_LESSON, {
        variables: { slug }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const blocks = data?.lesson?.blocks;
    const textBlock = blocks.find(block => block.__typename === 'CustomTextBlock');
    const { headingTb, textTb } = textBlock?.attributes || {};

    if (!blocks) {
        return <div>There's no content in this lesson.</div>;
    }

    return (
        <div className="container">
            <Text heading={headingTb} text={textTb} />
            <Link href="" className="post" key="">
                Child
            </Link>
        </div>
    );
}

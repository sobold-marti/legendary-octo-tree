'use client';

import Link from "next/link";
import Text from "../../../components/blocks/Text";
import Loading from "../../../components/layouts/Loading";
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
    const blocks = data?.lesson?.blocks;

    if (loading) {
        return (
            <Loading />
        );
    }
    
    if (error) {
        return (
            <div className="container mx-auto px-4">
                <p>Error: {error.message}</p>
            </div>
        );
    }

    if (!blocks) {
        return (
            <div className="container mx-auto px-4">
                <p>There's no content in this lesson.</p>
            </div>
        );
    }

    const textBlock = blocks.find(block => block.__typename === 'CustomTextBlock');
    const { headingTb, textTb } = textBlock?.attributes || {};

    return (
        <div className="container mx-auto px-4">
            <Text headingTb={headingTb} textTb={textTb} />
            <Link href="" className="post" key="">
                Child
            </Link>
        </div>
    );
}

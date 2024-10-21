import Link from "next/link";
import Text from "../../../components/blocks/Text";

export async function generateStaticParams() {
    // Fetch all lessons to generate the paths based on slugs
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        query: `
            query GetLessons {
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
    const lessons = json.data.lessons.nodes;
  
    // Return an array of params, each containing a slug
    return lessons.map((lesson) => ({
      slug: lesson.slug,
    }));
}
  
export default async function LessonPage({ params }) {
    const { slug } = params;

    // Fetch the lesson data based on the slug
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        query: `
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
        `,
        variables: { slug },
        }),
    });

    const result = await res.json();
	const blocks = result.data.lesson.blocks;
	// const textImageBlock = blocks.find(block => block.__typename === 'CustomTextImageBlock');
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

import './globals.css';
import './index.css';
import TextImage from '../components/blocks/TextImage';
import Text from '../components/blocks/Text';

export default async function Page() {  
	const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL}/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
			query {
				page(id: "home", idType: URI) {
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
		}),
	});
	const result = await res.json();
	const blocks = result.data.page.blocks;
	const textImageBlock = blocks.find(block => block.__typename === 'CustomTextImageBlock');
	const textBlock = blocks.find(block => block.__typename === 'CustomTextBlock');
	const { heading, text, imageUrl } = textImageBlock?.attributes || {};
	const { headingTb, textTb } = textBlock?.attributes || {};

	return (
		<div className="content">
			<Text heading={headingTb} text={textTb} />
			<TextImage heading={heading} text={text} imageUrl={imageUrl} />
		</div>
	);
}

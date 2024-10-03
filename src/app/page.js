import './globals.css';
import './index.css';
import TextImage from './components/blocks/TextImage';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

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
					}
				}
			}
			`,
		}),
	});
	const result = await res.json();
	const blocks = result.data.page.blocks;
	const textImageBlock = blocks.find(block => block.__typename === 'CustomTextImageBlock');
	const { heading, text, imageUrl } = textImageBlock?.attributes || {};

	return (
		<div className="content">
			<TextImage heading={heading} text={text} imageUrl={imageUrl} />
		</div>
	);
}

import './index.css';
import TextImage from "./components/blocks/TextImage";

export default async function HomePage() {
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
  
	if (!result.data || !result.data.page || !result.data.page.blocks) {
	  return <div>Error: No blocks available</div>;
	}
  
	const blocks = result.data.page.blocks;
  
	const textImageBlock = blocks.find(block => block.__typename === 'CustomTextImageBlock');
  
	if (!textImageBlock) {
	  return <div>No block found</div>;
	}
  
	const { heading, text, imageUrl } = textImageBlock.attributes;
  
	return (
	  <div>
		<TextImage heading={heading} text={text} imageUrl={imageUrl} />
	  </div>
	);
}

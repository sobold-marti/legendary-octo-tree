'use client';
// import './globals.css';
// import './index.css';
import TextImage from '../components/blocks/TextImage';
import Text from '../components/blocks/Text';
import Loading from '../components/layouts/Loading';
import { gql, useQuery } from "@apollo/client";

const GET_BLOCKS = gql`
	query GetBlocks {
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
`;

export default function Page() { 
	const {data, loading, error} = useQuery(GET_BLOCKS);

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

	const blocks = data?.page?.blocks;
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

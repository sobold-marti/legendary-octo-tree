// components/blocks/blockComponents.js
import { gql } from "@apollo/client";
import TextImage from './TextImage';
import Text from './Text';
import TeamRollup from './TeamRollup';

// Component map to match typename with the component
const BLOCK_COMPONENTS = {
    CustomTextImageBlock: TextImage,
    CustomTextBlock: Text,
    CustomTeamRollupBlock: TeamRollup,
};

// Define and export the GraphQL query
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
                ... on CustomTeamRollupBlock {
                    attributes {
                        headingTr
                        teamSelect
                    }
                }
            }
        }
    }
`;

export { BLOCK_COMPONENTS, GET_BLOCKS };

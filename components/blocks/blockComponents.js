import { gql } from "@apollo/client";
import TextImage from './TextImage';
import Text from './Text';
import TeamRollup from './TeamRollup';
import TabbedContent from './TabbedContent';

// Component map to match typename with the component
const BLOCK_COMPONENTS = {
    CustomTextImageBlock: TextImage,
    CustomTextBlock: Text,
    CustomTeamRollupBlock: TeamRollup,
    CustomTabbedContentBlock: TabbedContent,
};

// Define and export the GraphQL query
const GET_BLOCKS = gql`
    query GetBlocksBySlug($slug: ID!) {
        page(id: $slug, idType: URI) {
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
                ... on CustomTabbedContentBlock {
                    attributes {
                        tabOneTitle
                        tabOneContent
                        tabTwoTitle
                        tabTwoContent
                        tabThreeTitle
                        tabThreeContent
                    }
                }
            }
        }
    }
`;

export { BLOCK_COMPONENTS, GET_BLOCKS };

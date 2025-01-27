import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';

// GraphQL query to fetch a team member by slug
const GET_TEAM_MEMBER_BY_SLUG = gql`
  query GetTeamMemberBySlug($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Team {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

// Function to fetch a team member's data
async function fetchTeamMemberData(slug) {
  const { data } = await client.query({
    query: GET_TEAM_MEMBER_BY_SLUG,
    variables: { uri: `/team/${slug}` },
  });

  return data.nodeByUri;
}

// Generate static params for each team member - for single page
export async function generateStaticParams() {
  const GET_TEAM_MEMBER_SLUGS = gql`
    query GetTeamMemberSlugs {
      allTeam {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_TEAM_MEMBER_SLUGS,
  });

  return data.allTeam.nodes.map((member) => ({
    slug: member.slug,
  }));
}

// Page Component for Individual Team Member
export default async function Page({ params }) {
  const member = await fetchTeamMemberData(params.slug);

  if (!member) {
    return <div>Team member not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-12 gap-4">
        {member.featuredImage?.node?.sourceUrl && (
          <img
            src={member.featuredImage.node.sourceUrl}
            alt={member.title}
            className="w-full h-auto mb-6 rounded-lg col-span-12 md:col-span-4"
          />
        )}
        <div className="col-span-12 md:col-span-8">
          <h1 className="font-bold mb-4">{member.title}</h1>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: member.content }}
          />
        </div>
      </div>
    </div>
  );
}

import { gql, useQuery } from '@apollo/client';
import styles from './style.module.scss';
import Link from 'next/link';

// GraphQL query to fetch all team members
const GET_TEAM_MEMBERS = gql`
  query GetSpecificTeamMembers {
    allTeam {
      nodes {
        id
        slug
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

// Helper function to decode the Base64 ID from WPGraphQL
function decodeId(base64Id) {
  const decoded = atob(base64Id);
  const numericId = decoded.split(':')[1];
  return parseInt(numericId, 10);
}

export default function TeamRollup({ headingTr, teamSelect }) {
  // Convert `teamSelect` to an array if it's a string
  const parsedTeamSelect = typeof teamSelect === 'string' ? JSON.parse(teamSelect) : teamSelect;
  // Ensure `parsedTeamSelect` is an array
  const teamSelectArray = Array.isArray(parsedTeamSelect) ? parsedTeamSelect : [];
  
  const { loading, error, data } = useQuery(GET_TEAM_MEMBERS, {
    skip: teamSelectArray.length === 0,
  });

  if (loading) return <p>Loading team members...</p>;
  if (error) return <p>Error loading team members: {error.message}</p>;

  // Decode and filter team members based on teamSelectArray IDs, maintaining the order from teamSelectArray
  const teamMembers = teamSelectArray
    .map((id) => {
      const member = (data?.allTeam?.nodes || []).find(
        (member) => decodeId(member.id) === id
      );
      return member || null;
    })
    .filter(Boolean); // Remove any null values

  function extractExcerpt(htmlContent, wordLimit) {
      // Remove HTML tags
      const plainText = htmlContent.replace(/<[^>]+>/g, '');
      // Split the text into words and take the first 'wordLimit' words
      const words = plainText.split(/\s+/).slice(0, wordLimit);
      // Join the words back into a string and add ellipsis if needed
      return words.join(' ') + (words.length >= wordLimit ? '...' : '');
  }

  return (
    <section className={`${styles.teamRollup}`}>
      <div className="container mx-auto px-4">
        {headingTr && <h2 className={`${styles.teamRollup__heading}`}>{headingTr}</h2>}
        <div className="grid grid-cols-12 gap-4">
          {teamMembers.map((member) => (
            <Link href={`/team/${member.slug}`}
              key={member.id}
              className="col-span-12 md:col-span-4 bg-white shadow p-4 rounded-lg hover:bg-neutral-100 transition duration-300 ease-in-out"
            >
              {member.featuredImage && member.featuredImage.node && (
                <img
                  src={member.featuredImage.node.sourceUrl}
                  alt={member.title}
                  className={`${styles.teamRollup__image} w-full h-auto mb-4 rounded-lg`}
                />
              )}
              <h4 className="mb-2">
                  {member.title}
              </h4>
              <div className="text-gray-700">
                {extractExcerpt(member.content, 20)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

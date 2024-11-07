import { gql, useQuery } from '@apollo/client';
import styles from './style.module.scss';

// GraphQL query to fetch all team members
const GET_TEAM_MEMBERS = gql`
  query GetSpecificTeamMembers {
    allTeam {
      nodes {
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

// Helper function to decode the Base64 ID from WPGraphQL
function decodeId(base64Id) {
  const decoded = atob(base64Id);
  const numericId = decoded.split(':')[1];
  return parseInt(numericId, 10);
}

export default function TeamRollup({ heading, teamSelect }) {
  const { loading, error, data } = useQuery(GET_TEAM_MEMBERS, {
    skip: !teamSelect || teamSelect.length === 0,
  });

  if (loading) return <p>Loading team members...</p>;
  if (error) return <p>Error loading team members: {error.message}</p>;

  // Decode and filter team members based on teamSelect IDs
  const teamMembers = (data?.allTeam?.nodes || []).filter(member =>
    teamSelect.includes(decodeId(member.id))
  );

  return (
    <section className="team-rollup">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className={`${styles.teamRollup__heading}`}>{heading}</h2>
        )}
        <div className="grid grid-cols-12 gap-4">
          {teamMembers.map(member => (
            <div key={member.id} className="col-span-12 md:col-span-4 bg-white shadow p-4 rounded-lg">
              {member.featuredImage && member.featuredImage.node && (
                <img
                  src={member.featuredImage.node.sourceUrl}
                  alt={member.title}
                  className="w-full h-auto mb-4 rounded-lg"
                />
              )}
              <h4 className="mb-2">{member.title}</h4>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: member.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

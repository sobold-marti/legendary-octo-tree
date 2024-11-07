'use client';
import Loading from '../components/layouts/Loading';
import { useQuery } from "@apollo/client";
import { BLOCK_COMPONENTS, GET_BLOCKS } from '../components/blocks/blockComponents';

export default function Page() { 
    const { data, loading, error } = useQuery(GET_BLOCKS);

    if (loading) return <Loading />;
    if (error) return <div className="container"><p>Error: {error.message}</p></div>;

    const blocks = data?.page?.blocks || [];

    return (
        <div className="content">
            {blocks.map((block, index) => {
                // Get the component based on the typename
                const BlockComponent = BLOCK_COMPONENTS[block.__typename];

                // Only render if the component exists in the map
                if (BlockComponent) {
                    return (
                        <BlockComponent
                            key={index}
                            {...block.attributes} // Pass attributes as props
                        />
                    );
                }

                // Optionally handle unknown block types
                console.warn(`Unknown block type: ${block.__typename}`);
                return null;
            })}
        </div>
    );
}

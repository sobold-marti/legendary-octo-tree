'use client';

import Loading from '../../components/layouts/Loading';
import { useQuery } from "@apollo/client";
import { BLOCK_COMPONENTS, GET_BLOCKS } from '../../components/blocks/blockComponents';

export default function BlocksRenderer({ slug }) {
    const { data, loading, error } = useQuery(GET_BLOCKS, {
        variables: { slug }, // Pass the correct slug dynamically
    });

    if (loading) return <Loading />;
    if (error) return <div className="container"><p>Error: {error.message}</p></div>;

    const blocks = data?.page?.blocks || [];

    return (
        <div className="content">
            {blocks.map((block, index) => {
                const BlockComponent = BLOCK_COMPONENTS[block.__typename];

                if (BlockComponent) {
                    return <BlockComponent key={index} {...block.attributes} />;
                }

                console.warn(`Unknown block type: ${block.__typename}`);
                return null;
            })}
        </div>
    );
}

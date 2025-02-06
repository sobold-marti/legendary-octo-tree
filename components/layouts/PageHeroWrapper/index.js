"use client";
import { useQuery, gql } from "@apollo/client";
import { usePathname } from "next/navigation";
import Hero from "../Hero";

const GET_PAGE_ID = gql`
  query GetPageId($slug: String!) {
    pageBy(uri: $slug) {
      id
    }
  }
`;

export default function PageHeroWrapper() {
  const pathname = usePathname();
  const slug = pathname === "/" ? "/" : pathname.replace(/^\/|\/$/g, "");

  const { data, loading, error } = useQuery(GET_PAGE_ID, {
    variables: { slug },
    skip: !slug,
  });

  if (loading) return null;
  if (error) {
    console.error("Error fetching page ID:", error);
    return null;
  }

  const pageId = data?.pageBy?.id;
  if (!pageId) return null;
  
  return <Hero pageId={pageId} />;
}

'use client';

import { useQuery, gql } from "@apollo/client";
import { usePathname } from "next/navigation";
import style from "./style.module.scss";

// Query for general pages
const GET_HERO_DATA = gql`
  query GetHeroData($slug: String!) {
    pageBy(uri: $slug) {
      id
      heroType
      heroHeading
      heroSubheading
      heroButtonText
      heroButtonUrl
      heroImage
    }
  }
`;

// Query for lesson options
const GET_LESSON_HERO_DATA = gql`
  query GetLessonHeroData {
    lessonOptions {
      heroType
      heroHeading
      heroSubheading
      heroButtonText
      heroButtonUrl
      heroImage
    }
  }
`;

// Query for team options
const GET_TEAM_HERO_DATA = gql`
  query GetTeamHeroData {
    teamOptions {
      heroType
      heroHeading
      heroSubheading
      heroButtonText
      heroButtonUrl
      heroImage
    }
  }
`;

export default function Hero() {
  const pathname = usePathname();
  const isLessonsPage = pathname.startsWith("/lessons");
  const isTeamPage = pathname.startsWith("/team");
  const slug = pathname === "/" ? "/" : pathname.replace(/^\/+|\/+$/g, "");

  
  // Determine the correct query
  const { data, error } = useQuery(
    isLessonsPage
    ? GET_LESSON_HERO_DATA
    : isTeamPage
    ? GET_TEAM_HERO_DATA
    : GET_HERO_DATA,
    {
      variables: isLessonsPage || isTeamPage ? {} : { slug },
      skip: (isLessonsPage || isTeamPage) ? false : !slug,
    }
  );
  

  console.log(data);

  if (error) {
    console.error("Error fetching hero data:", error);
    return <div>Error loading hero data</div>;
  }

  // Extract the correct page data
  const page = isLessonsPage
    ? data?.lessonOptions
    : isTeamPage
    ? data?.teamOptions
    : data?.pageBy;

  if (!page) return null;

  const {
    heroType,
    heroHeading,
    heroSubheading,
    heroButtonText,
    heroButtonUrl,
    heroImage,
  } = page;

  if (heroType === 'image') {
    return (
      <section className={style.heroImage}>
        <div className={`${style.heroImage__content} container mx-auto`}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 py-8 px-4">
              <h1 className={style.heroImage__heading}>{heroHeading}</h1>
              <p className={style.heroImage__subheading}>{heroSubheading}</p>
              {heroButtonText && heroButtonUrl && (
                <a className="button button--primary" href={heroButtonUrl}>{heroButtonText}</a>
              )}
            </div>
            <div
              className="col-span-12 md:col-span-6 h-96 md:hidden"
              style={{ backgroundImage: `url(${heroImage})` }}
            ></div>
          </div>
        </div>
        <div
          className={`${style.heroImage__image} md:block hidden`}
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
      </section>
    );
  }

  if (heroType === 'standard') {
    return (
      <section className={style.heroStandard}>
        <div className={`${style.heroStandard__content} container mx-auto px-4`}>
          <div className={style.heroStandard__text}>
            <h1 className={style.heroStandard__heading}>{heroHeading}</h1>
            <p className={style.heroStandard__subheading}>{heroSubheading}</p>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

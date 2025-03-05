'use client';

import { useQuery, gql } from "@apollo/client";
import { usePathname } from "next/navigation";
import style from "./style.module.scss";

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

export default function Hero() {
  const pathname = usePathname();
  const slug = pathname === "/" ? "/" : pathname.replace(/^\/+|\/+$/g, "");
  console.log(slug);

  const { data, error } = useQuery(GET_HERO_DATA, {
    variables: { slug },
    skip: !slug,
  });

  if (error) {
    console.error("Error fetching hero data:", error);
    return <div>Error loading hero data</div>;
  }

  const page = data?.pageBy;
  if (!page) return null;

  const {
    heroType,
    heroHeading,
    heroSubheading,
    heroButtonText,
    heroButtonUrl,
    heroImage,
  } = page;

  if (heroType === "image") {
    return (
      <section className={style.heroImage}>
        <div className={`${style.heroImage__content} container mx-auto px-4`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className={`${style.heroImage__text} col-span-12 md:col-span-6`}>
              <h1 className={style.heroImage__heading}>{heroHeading}</h1>
              <p className={style.heroImage__subheading}>{heroSubheading}</p>
              <a className="button button--primary" href={heroButtonUrl}>{heroButtonText}</a>
            </div>
            <div className="col-span-12 md:col-span-6"></div>
          </div>
        </div>
        <div
          className={style.heroImage__image}
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
      </section>
    );
  }

  if (heroType === "standard") {
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

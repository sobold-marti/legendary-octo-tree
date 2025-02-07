import { useState, useEffect, useMemo } from "react";
import styles from "./style.module.scss";
import Link from "next/link";

export default function TabbedContent({
  mainHeading,
  tabOneTitle,
  tabTwoTitle,
  tabThreeTitle,
  tabOneContent = "[]",
  tabTwoContent = "[]",
  tabThreeContent = "[]",
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [tabContent, setTabContent] = useState([[], [], []]);

  // Memorize tabs so it's not recreated on every render
  const tabs = useMemo(
    () => [
      { title: tabOneTitle, content: tabOneContent },
      { title: tabTwoTitle, content: tabTwoContent },
      { title: tabThreeTitle, content: tabThreeContent },
    ],
    [tabOneTitle, tabTwoTitle, tabThreeTitle, tabOneContent, tabTwoContent, tabThreeContent]
  );

  useEffect(() => {
    setTabContent([
      JSON.parse(tabs[0].content || "[]"),
      JSON.parse(tabs[1].content || "[]"),
      JSON.parse(tabs[2].content || "[]"),
    ]);
  }, [tabs]);

  return (
    <section className={`${styles.tabbedContent}`}>
      <div className={`${styles.tabbedContent__container} container mx-auto px-4`}>
        <h2 className="tabbed-content__main-heading">{mainHeading}</h2>
        <div className={styles.tabbedContent__navigation}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tabbedContent__tab} tab ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <div className={styles.tabbedContent__inner}>
            {Array.isArray(tabContent[activeTab]) && tabContent[activeTab].length > 0 ? (
              <ul>
                {tabContent[activeTab].map((post, idx) => (
                  <li key={idx}>
                    <Link href={`/${post.postType}/${post.slug}`}>
                        <h4>{post.title}</h4>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No content available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

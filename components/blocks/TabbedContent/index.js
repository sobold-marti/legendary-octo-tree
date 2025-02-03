import { useState, useEffect, useMemo } from "react";
import styles from "./style.module.scss";

export default function TabbedContent({
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
  }, [tabs]); // Now, tabs is stable and only updates when needed

  return (
    <section className={`${styles.tabbedContent}`}>
      <div className={`${styles.tabbedContent__container} container mx-auto px-4`}>
        <div className={styles.tabbedContent__navigation}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tabbedContent__tab} ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <div className="tab-content__inner">
            {Array.isArray(tabContent[activeTab]) && tabContent[activeTab].length > 0 ? (
              <ul>
                {tabContent[activeTab].map((post, idx) => (
                  <li key={idx}>
                    <h4>{post.title}</h4>
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
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

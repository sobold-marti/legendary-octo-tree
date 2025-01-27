import styles from './style.module.scss';

export default function Text({ headingTb, textTb }) {
  return (
    <section className={`${styles.text}`}>
      <div className="text__container container mx-auto px-4">
        <div className="grid">
          {(headingTb || textTb) && (
            <div>
              <h2 className={`${styles.text__heading}`}>{headingTb}</h2>
              <p
                className="text__text"
                dangerouslySetInnerHTML={{ __html: textTb }}
              ></p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

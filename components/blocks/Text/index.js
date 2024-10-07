export default function Text({ heading, text }) {
  return (
    <section className="text">
      <div className="text__container container mx-auto px-4">
        <div className="grid">
          {(heading || text) && (
            <div>
              <h2>{heading}</h2>
              <p className="text__text">{text}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

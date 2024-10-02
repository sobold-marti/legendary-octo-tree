// TextImageBlock/index.js
const TextAndImage = ({ text, imageUrl }) => {
  return (
    <section className="text-image">
      <div className="text-image__container container container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {text && (
            <div className="text-image__content col-span-12 md:col-span-6">
              <p className="text-image__text text-3xl">{text}</p>
            </div>
          )}
          {imageUrl && (
            <div className="text-image__image col-span-12 md:col-span-6">
              <img src={imageUrl} alt="Text and Image Block" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextAndImage;

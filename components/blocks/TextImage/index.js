import styles from './style.module.scss';
import Modal from '../Modal/Modal';

export default function TextImage({ heading, text, imageUrl }) {
  return (
    <section className={`${styles.textImage}`}>
      <div className="text-image__container container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {(heading || text) && (
            <div className={`${styles.textImage__content} col-span-12 md:col-span-6`}>
              <h2 className={`${styles.textImage__heading}`}>{heading}</h2>
              <p className="text-image__text">{text}</p>
            </div>
          )}
          {imageUrl && (
            <div className={`${styles.textImage__image} text-image__image col-span-12 md:col-span-6 relative`}>
              <img src={imageUrl} alt="Text and Image Block" />
              <Modal 
                text={'Open'} 
                content={<img src={imageUrl} alt="Text and Image Block" />}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

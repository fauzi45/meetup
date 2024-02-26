import React, { useEffect, useState } from 'react';
import classes from './style.module.scss';

const Carousel = ({ images, interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const autoPlayInterval = setInterval(nextSlide, interval);
    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [interval]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={classes.carousel}>
      <button onClick={prevSlide} className={classes.carousel__btn_prev}>
        &lt;
      </button>
      <img src={images[activeIndex]} alt={`Slide ${activeIndex}`} className={classes.carousel__img} />
      <button onClick={nextSlide} className={classes.carousel__btn_next}>
        &gt;
      </button>
      <div className={classes.indicators}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${classes.indicator} ${activeIndex === index ? classes.active : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
export default Carousel;

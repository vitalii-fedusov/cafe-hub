import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../Card/Card";
import cafesFromServer from "../../api/cafes.json";
import { Cafe } from "../../Types/Cafe";
import arrowRight from '../../assets/icons/arrow-right.svg';

export const CardSwiper: React.FC = () => {
  const cafes: Cafe[] = JSON.parse(JSON.stringify(cafesFromServer));

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };

  return (
    <>
      <div className="card-container" data-cy="cardsContainer">
        <div className="slick-top">
          <h2 className="slick-title">Популярні заклади</h2>
          <a href="." className="slick-link">
            <label className="slick-link__label">Дивитись усі</label>
            <img src={arrowRight} alt="arrow-right-icon" />
          </a>
        </div>
        <Slider {...settings}>
          {cafes.map((cafe) => (
            <Card card={cafe} key={cafe.id} />
          ))}
        </Slider>
      </div>
    </>
  );
};

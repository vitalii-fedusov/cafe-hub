import React from "react";
import { NavLink } from "react-router-dom";
import { Cafe } from "../../Types/Cafe";
import mapPin from "../../assets/icons/tabler-icon-map-pin.svg";
import clock from "../../assets/icons/tabler-icon-clock-hour-10.svg";
import TextRating from "../Stars/Stars";

type Props = {
  card: Cafe;
};

export const Card: React.FC<Props> = ({ card }) => {
  const {
    name,
    address,
    // phoneNumber,
    urlToGoogleMaps,
    urlOfImage,
    openFromWeekdays,
    closeAtWeekdays,
    averageBill,
    id,
    // rating,
  } = card;

  function getValidTime(time: string) {
    return time.slice(0, -3);
  }

  function getKitchenTime(time: string) {
    const hour = parseInt(time.split(":")[0], 10);

    return `(кухня до ${hour - 1}:30)`;
  }

  const weekdaysHours = `${getValidTime(openFromWeekdays)}-${getValidTime(closeAtWeekdays)} `;
  const kitchenHours = getKitchenTime(closeAtWeekdays);

  return (
    <div className="card">
      <NavLink
        to={`/${id}`}
        className="card__link"
      >
        <img className="card__image" src={urlOfImage} alt={name} />
      </NavLink>

      <ul className="card__list">
        <li className="card__item">
          <h3 className="card__name">
            <strong>{card.name}</strong>
          </h3>
        </li>

        <li className="card__item">
          <a href={urlToGoogleMaps} className="card__link" target="blank">
            <img src={mapPin} alt="mapPinIcon" />
            <p className="card__paragraph card__paragraph--address">
              {address}
            </p>
          </a>
        </li>

        <li className="card__item">
          <img src={clock} alt="clockIcon" />
          <p className="card__paragraph card__paragraph--hours">
            {weekdaysHours}
            {kitchenHours}
          </p>
        </li>

        <li className="card__item">
          <TextRating />
          <div>(8 відгуків)</div>
        </li>

        <li className="card__item">
          <p className="card__paragraph">{`Середній чек: $${averageBill}`}</p>
        </li>
      </ul>
    </div>
  );
};

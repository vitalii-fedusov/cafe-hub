import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Box, Rating, StyledEngineProvider, Tab, Tabs } from "@mui/material";
import classNames from "classnames";
import mapPin from "../../assets/icons/tabler-icon-map-pin.svg";
// eslint-disable-next-line
import { CafeDescription } from "../../Components/CafeDescription/CafeDescription";
import { CardSwiper } from "../../Components/CardSwiper/CardSwiper";
import { CafeImages } from "../../Components/CafeImages/CafeImages";
// eslint-disable-next-line
import { CafeTestimonials } from "../../Components/CafeTestimonials/CafeTestimonials";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// eslint-disable-next-line
import * as selectedCafeActions from "../../features/SelectedCafe/selectedCafeSlice";
import { LikeButton } from "../../Components/LikeButton/LikeButton";

enum CafeInfoSections {
  DESCRIPTION = "Опис",
  PHOTO = "Фото",
  TESTIMONIALS = "Відгуки",
}

function getValidTime(time: string) {
  return time.slice(0, -3);
}

export const CafeDetails: React.FC = () => {
  const cafeInfoSections = [
    CafeInfoSections.DESCRIPTION,
    CafeInfoSections.PHOTO,
    CafeInfoSections.TESTIMONIALS,
  ];

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line
  const cafeInfoSection =
    searchParams.get("section") || CafeInfoSections.DESCRIPTION;

  const handleSectionChange = (newSection: CafeInfoSections) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set("section", newSection.toString());

      return newParams;
    });
  };

  const dispatch = useAppDispatch();

  const location = useLocation();
  const { selectedCafe, loading, error } = useAppSelector(
    (state) => state.selectedCafe
  );

  useEffect(() => {
    dispatch(
      selectedCafeActions.getSelectedCafe(+location.pathname.replace("/", ""))
    );
  }, [location.pathname, dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!selectedCafe) {
    return null;
  }

  const {
    name,
    address,
    phoneNumber,
    // languages,
    // openFromWeekdays,
    closeAtWeekdays,
    openFromWeekdays,
    // closeAtWeekends,
    // score,
    urlToGoogleMaps,
    urlOfImage,
    webSite,
    averageBill,
    score,
  } = selectedCafe;

  const weekdaysHours = `${getValidTime(openFromWeekdays)}-${getValidTime(closeAtWeekdays)} `;

  return (
    <>
      <div className="button-wrap">
        {/* eslint-disable-next-line */}
        <button
          className="button"
          id="backButton"
          type="button"
          onClick={() => navigate("/home")}
        ></button>
        <label htmlFor="backButton">Назад</label>
      </div>

      <div className="cafe main__cafe">
        <a href={webSite} target="blank" className="cafe__main-link">
          <img className="cafe__image" src={urlOfImage} alt={name} />
        </a>

        <ul className="cafe__list">
          <li className="cafe__item">
            <h3 className="cafe__name">
              <strong>{name}</strong>
            </h3>
          </li>

          <li className="cafe__item">
            <a href={urlToGoogleMaps} className="cafe__link" target="blank">
              <img src={mapPin} alt="mapPinIcon" />
              <p className="cafe__paragraph cafe__paragraph--address">
                {address}
              </p>
              <p className="cafe__paragraph cafe__paragraph--address-show">
                показати на мапі
              </p>
            </a>
          </li>

          <li className="cafe__item">
            <p className="cafe__paragraph cafe__paragraph--hours">
              {`Графік роботи: пн-пт: ${weekdaysHours}, сб-нд: ${weekdaysHours}`}
            </p>
          </li>

          <li className="cafe__item cafe__item--tel">
            <p className="cafe__paragraph">Номер телефону:&nbsp;</p>
            <a className="cafe__paragraph" href={`tel:${phoneNumber}`}>
              {phoneNumber}
            </a>
          </li>

          <li className="cafe__item">
            <p className="cafe__paragraph">{`Середній чек: $${averageBill}`}</p>
          </li>

          <li className="cafe__item">
            <p className="cafe__paragraph">Мова: Ukrainian/English</p>
          </li>

          <li className="cafe__item cafe__rating">
            <Rating value={score} readOnly precision={0.5} />
            <p className="cafe__paragraph">(8 відгуків)</p>
          </li>
        </ul>

        <LikeButton />
      </div>

      <StyledEngineProvider injectFirst>
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            gridColumn: "span 8",
          }}
          className="cafe-info main__cafe-info"
        >
          <Tabs
            value={false}
            centered
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
            className="cafe-info__tabs"
          >
            {cafeInfoSections.map((section, index) => (
              <Tab
                value={index}
                key={section}
                label={section}
                onClick={() => handleSectionChange(section)}
                sx={{
                  width: "calc(100% / 3)",
                }}
                className={classNames("cafe-info__tab", {
                  "cafe-info__tab--active": cafeInfoSection === section,
                })}
              />
            ))}
          </Tabs>
          {cafeInfoSection === CafeInfoSections.DESCRIPTION && (
            <CafeDescription />
          )}

          {cafeInfoSection === CafeInfoSections.PHOTO && <CafeImages />}

          {cafeInfoSection === CafeInfoSections.TESTIMONIALS && (
            <CafeTestimonials />
          )}
        </Box>
      </StyledEngineProvider>

      <CardSwiper />
    </>
  );
};

import { StyledEngineProvider, Tab, Tabs } from "@mui/material";
// eslint-disable-next-line
import { Box } from "@mui/system";
import classNames from "classnames";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// eslint-disable-next-line
import { FavouritesCafes } from "../../Components/FavouritesCafes/FavouritesCafes";
import { MyComments } from "../../Components/MyComments/MyComments";
// eslint-disable-next-line
import { CabinetSettings } from "../../Components/CabinetSettings/CabinetSettings";

enum CabinetSections {
  FAVOURITES = "улюблені заклади",
  MY_COMMENTS = "мої відгуки",
  SETTINGS = "налаштування",
}

export const Cabinet: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const cabinetSections = [
    CabinetSections.FAVOURITES,
    CabinetSections.MY_COMMENTS,
    CabinetSections.SETTINGS,
  ];

  // eslint-disable-next-line
  const cabinetSection =
    searchParams.get("section") || CabinetSections.FAVOURITES;

  const handleSectionChange = (newSection: CabinetSections) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set("section", newSection.toString());

      return newParams;
    });
  };

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
        <label htmlFor="backButton">На головну</label>
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
            {cabinetSections.map((section, index) => (
              <Tab
                value={index}
                key={section}
                label={section}
                onClick={() => handleSectionChange(section)}
                sx={{
                  width: "calc(100% / 3)",
                }}
                className={classNames("cafe-info__tab", {
                  "cafe-info__tab--active": cabinetSection === section,
                })}
              />
            ))}
          </Tabs>
          {cabinetSection === CabinetSections.FAVOURITES && <FavouritesCafes />}

          {cabinetSection === CabinetSections.MY_COMMENTS && <MyComments />}

          {cabinetSection === CabinetSections.SETTINGS && <CabinetSettings />}
        </Box>
      </StyledEngineProvider>
    </>
  );
};

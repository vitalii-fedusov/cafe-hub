import React, { useEffect, useState } from "react";
import allDoneIcon from "../../assets/icons/done-all-icon.svg";
import circusBuildingIcon from "../../assets/icons/circus-building-icon.svg";
import { useAppSelector } from "../../app/hooks";
import { Cafe } from "../../Types/Cafe";

export const CafeDescription: React.FC = () => {
  type Feature = {
    key: keyof Cafe;
    label: string;
  };

  type Occasion = {
    key: keyof Cafe;
    label: string;
  };

  const features: Feature[] = [
    { key: "coworking", label: "Coworking" },
    { key: "vegan", label: "Vegan" },
    { key: "petFriendly", label: "Pet Friendly" },
    { key: "fastService", label: "Fast Service" },
    { key: "wifi", label: "Wi-Fi" },
    { key: "businessLunch", label: "Business Lunch" },
    { key: "freeWater", label: "Free Water" },
    { key: "boardGames", label: "Board Games" },
    { key: "parking", label: "Parking" },
    { key: "terrace", label: "Terrace" },
    // { key: "openNow", label: "Open Now" },
  ];

  const occasions: Occasion[] = [
    { key: "birthday", label: "Birthday" },
    { key: "businessMeeting", label: "Business Meeting" },
    { key: "childHoliday", label: "Child Holiday" },
    { key: "romantic", label: "Romantic" },
    { key: "thematicEvent", label: "Thematic Event" },
    { key: "familyHoliday", label: "Family Holiday" },
  ];

  const [availableFeatures, setAvailableFeatures] = useState<string[]>([]);
  const [availableOccasions, setAvailableOccasions] = useState<string[]>([]);

  const { selectedCafe } = useAppSelector((state) => state.selectedCafe);

  useEffect(() => {
    if (selectedCafe) {
      const selectedCafeAvailableFeatures = features
        .filter((feature) => selectedCafe[feature.key])
        .map((feature) => feature.label);

      const selectedCafeAvailableOccasions = occasions
        .filter((occasion) => selectedCafe[occasion.key])
        .map((occasion) => occasion.label);

      setAvailableOccasions(selectedCafeAvailableOccasions);
      setAvailableFeatures(selectedCafeAvailableFeatures);
    }
  }, [selectedCafe]);

  if (!selectedCafe) {
    return null;
  }

  const { description } = selectedCafe;

  return (
    <div className="cafe-info__description-section">
      <div className="cafe-section">
        <article className="cafe-section__article">{description}</article>
        <div className="cafe-features">
          <div className="cafe-feature cafe-feature--features">
            <h3 className="cafe-feature__title">Особливості</h3>
            <ul className="cafe-feature__list">
              {availableFeatures.map((feature) => (
                <li key={feature} className="cafe-feature__item">
                  <img
                    src={allDoneIcon}
                    alt="all-done-icon"
                    className="cafe-feature__icon"
                  />
                  <p className="cafe-feature__text">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="cafe-feature cafe-feature--occasion">
            <h3 className="cafe-feature__title">Привід</h3>
            <ul className="cafe-feature__list">
              {availableOccasions.map((occasion) => (
                <li key={occasion} className="cafe-feature__item">
                  <img
                    src={circusBuildingIcon}
                    alt="circus-building-icon"
                    className="cafe-feature__icon"
                  />
                  <p className="cafe-feature__text">{occasion}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useSearchParams } from "react-router-dom";
import searchIcon from "../../assets/icons/magnifier.svg";

export const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set("name", event.target.value);

      return newParams;
    });
  };

  return (
    <div className="search-bar main__search-bar">
      <ul className="search-bar__list">
        <li className="search-bar__item search-bar__item--city">
          <button
            type="button"
            style={{
              height: "56px",
              width: "100%",
              backgroundColor: "white",
              boxShadow: "0px 2px 4px 0px #4E4E4E33",
            }}
          >
            <h3
              style={{
                margin: 0,
                padding: 0,
                fontSize: "18px",
                fontWeight: "bold",
                color: "#343A40",
              }}
            >
              Київ
            </h3>
          </button>
        </li>

        <li
          className="search-bar__item search-bar__item--input"
          style={{ position: "relative" }}
        >
          <img
            src={searchIcon}
            alt="magnifier"
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: "12px"
            }}
          />
          <label htmlFor="main-input" className="search-bar__label">
            <input
              value={searchParams.get("name") || ""}
              onChange={(e) => handleInputChange(e)}
              id="main-input"
              className="search-bar__input"
              type="text"
              placeholder="Обери найкраще місце для свого відпочинку"
            />
          </label>
          <button style={{ position: "absolute" }} type="button">
            delete
          </button>
        </li>

        <li className="search-bar__item search-bar__item--search">
          <button className="search-bar__search" type="button">
            Пошук
          </button>
        </li>
      </ul>
    </div>
  );
};

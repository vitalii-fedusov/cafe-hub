import React from "react";
import logo from "../../assets/icons/cafe-logo.svg";
import world from "../../assets/icons/world-icon.svg";
import { useAppSelector } from "../../app/hooks";
import UserDwopdownMenu from "../UserDwopdownMenu/UserDwopdownMenu";
import { ModalLoginWindow } from "../ModalLoginWindow/ModalLoginWindow";

export const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <header className="header page__header">
      <div className="top-bar header__top-bar">
        <a className="logo" href=".">
          <img src={logo} alt="CafeHub logo" />
        </a>

        <nav className="top-bar__nav">
          <ul className="top-bar__items">
            <li className="top-bar__item">
              <span
                className="top-bar__icon"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#343A40",
                }}
              >
                UA
              </span>
              <img className="top-bar__icon" src={world} alt="icon world" />
            </li>

            <li className="top-bar__item">
              {user ? (
                <UserDwopdownMenu />
              ) : (
                <>
                  <button
                    className="top-bar__button"
                    type="button"
                    onClick={handleOpen}
                    style={{fontSize: "18px"}}
                  >
                    Вхід
                  </button>
                  <ModalLoginWindow open={open} handleClose={handleClose} />
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

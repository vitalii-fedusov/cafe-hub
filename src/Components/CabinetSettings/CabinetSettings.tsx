import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useLocalStorage } from "../../customHook/useLocalStorage";
import avatar1 from "../../assets/images/avatars/avatar-1.png";
import avatar2 from "../../assets/images/avatars/avatar-2.png";
import avatar3 from "../../assets/images/avatars/avatar-3.png";
import avatar4 from "../../assets/images/avatars/avatar-4.png";
import avatar5 from "../../assets/images/avatars/avatar-5.png";
import avatar6 from "../../assets/images/avatars/avatar-6.png";
import avatar7 from "../../assets/images/avatars/avatar-7.png";
import avatar8 from "../../assets/images/avatars/avatar-8.png";
import avatar9 from "../../assets/images/avatars/avatar-9.png";
import avatar10 from "../../assets/images/avatars/avatar-10.png";
import avatar11 from "../../assets/images/avatars/avatar-11.png";
import avatar12 from "../../assets/images/avatars/avatar-12.png";

export const CabinetSettings: React.FC = () => {
  const { loading } = useAppSelector((state) => state.image);
  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar12,
  ];
  const [myAvatar, setMyAvatar] = useLocalStorage("myAvatar", "");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleAvatarChange = () => {
    if (!selectedAvatar) {
      return;
    }

    setMyAvatar(selectedAvatar);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: "20px",
      }}
    >
      <h1 style={{ gridColumn: "span 8" }}>Зміна аватару</h1>
      <div
        style={{
          gridColumn: "span 2",
          height: "322px",
          width: "305px",
          position: "relative",
          backgroundImage: `url(${myAvatar || avatar1})`,
          backgroundPosition: "center center",
          borderRadius: "12px",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <label
          className="search-bar__search"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "43px",
            gap: "12px",
            position: "absolute",
            left: 0,
            bottom: 0,
            backgroundColor: "#F8F9FA",
            color: "#111111",
            borderRadius: "12px",
          }}
        >
          Мій аватар
        </label>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridColumn: "span 6",
          gap: "8px",
          padding: "8px",
          borderRadius: "12px",
          boxShadow: "0px 2px 4px 0px #4E4E4E33",
        }}
      >
        {avatars.map((i) => (
          // eslint-disable-next-line
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            key={i}
            onClick={() => setSelectedAvatar(i)}
          >
            <img
              src={i}
              alt={i}
              style={{
                border: selectedAvatar === i ? "1px solid green" : "none",
                cursor: "pointer",
                gridColumn: "span 1",
                width: "100%",
              }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleAvatarChange}
        type="button"
        className="search-bar__search testimonials__button"
        style={{
          gridColumn: "-2 / -1"
        }}
      >
        Зберегти
      </button>
    </div>
  );
};

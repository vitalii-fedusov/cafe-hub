import React, { useEffect } from "react";
// eslint-disable-next-line
import { initFavourites } from "../../features/favouritesCafes/favouritesCafesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Card } from "../Card/Card";

export const FavouritesCafes: React.FC = () => {
  const { favouritesCafes, loading, error } = useAppSelector(
    (state) => state.favourites
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initFavourites());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h1>{`You have ${favouritesCafes.length} favourites cafes`}</h1>
      {!favouritesCafes.length && (
        <h1>There are no cafes with current filters</h1>
      )}
      <div className="main page__main">
        {favouritesCafes.map((cafe) => (
          <Card card={cafe} key={cafe.id} />
        ))}
      </div>
    </>
  );
};

import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Chip, Stack } from "@mui/material";
import { Card } from "../../Components/Card/Card";
import { Filters } from "../../Components/Filters/Filters";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as cafesActions from "../../features/cafes/cafesSlice";

export const Home: React.FC = () => {
  const search = {
    coworking: false,
    vegan: false,
    petFriendly: false,
    fastService: false,
    wifi: false,
    businessLunch: false,
    freeWater: false,
    boardGames: false,
    birthday: false,
    businessMeeting: false,
    childHoliday: false,
    romantic: false,
    thematicEvent: false,
    familyHoliday: false,
    parking: false,
    terrace: false,
    openNow: false,
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get("page") || 1);
  const cuisines = searchParams.getAll("cuisines");
  const searchOptions = searchParams.getAll("searchOptions");
  const services = cuisines.concat(searchOptions);

  const { cafes, loading, error } = useAppSelector((state) => state.cafes);
  const dispatch = useAppDispatch();

  if (error) {
    // eslint-disable-next-line
    console.error(error);
  }

  useEffect(() => {
    let url = "";

    Object.keys(search).forEach((key) => {
      if (searchOptions.includes(key)) {
        url += `${key}=true`;
      } else {
        url += `${key}=false`;
      }

      url += "&";
    });

    if (cuisines.length > 0) {
      url += `cuisines=${cuisines.join(",")}`;

      url += "&";
    }

    url += "city=Kyiv";

    // if (searchParams.get("name")) {
    //   url += "&";
    //   url += `name=${searchParams.get("name")}`;
    // }

    if (services.length === 0) {
      dispatch(cafesActions.init());
    } else {
      dispatch(cafesActions.initFiltered(url));
    }
  }, [services.length]);

  // useEffect(() => {
  //   window.scrollTo(0, 500);
  // }, [page, services]);

  const itemsPerPage = 9;
  const itemOffset = (page - 1) * itemsPerPage;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = cafes.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cafes.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set("page", newPage.toString());

      return newParams;
    });
  };

  function toggleService(service: string) {
    if (cuisines.includes(service)) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        const newCuisines = cuisines.includes(service)
          ? cuisines.filter((ch) => ch !== service)
          : [...cuisines, service];

        params.delete("cuisines");
        newCuisines.forEach((ch) => params.append("cuisines", ch));
        params.set("page", "1");

        return params;
      });
    } else {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        const newSearchOptions = searchOptions.includes(service)
          ? searchOptions.filter((ch) => ch !== service)
          : [...searchOptions, service];

        params.delete("searchOptions");
        newSearchOptions.forEach((ch) => params.append("searchOptions", ch));
        params.set("page", "1");

        return params;
      });
    }
  }

  const preparedCafes = currentItems.filter((i) =>
    i.name.toLowerCase().includes(searchParams.get("name")?.toLowerCase() || "")
  );

  return (
    <>
      <SearchBar />
      <Filters />

      <div className="main__cards">
        {!!services.length && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            {services.map((service) => (
              <Chip
                key={service}
                label={service}
                color="success"
                variant="outlined"
                onDelete={() => toggleService(service)}
              />
            ))}
          </Stack>
        )}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {!preparedCafes.length && (
              <h1>There are no cafes with current filters</h1>
            )}
            <div className="main__cards-container">
              {preparedCafes.map((cafe) => (
                <Card card={cafe} key={cafe.id} />
              ))}
            </div>
            {!!preparedCafes.length && (
              <ReactPaginate
                breakLabel="..."
                nextLabel=""
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel=""
                renderOnZeroPageCount={null}
                forcePage={page - 1}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

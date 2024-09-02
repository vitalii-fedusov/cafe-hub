import React from "react";

import { brown } from "@mui/material/colors";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export const Filters: React.FC = () => {
  const filters = [
    {
      name: "Кухня",
      options: [
        ["Українська", "Ukrainian"],
        ["Європейська", "European"],
        ["Авторська", "Hosper"],
        ["Здорова їжа", "Healthy"],
        ["Смачна випічка та кава", "Pastries and coffee"],
        ["Піца", "Pizza"],
        ["Fast food", "Fast food"],
      ],
    },
    {
      name: "Послуги",
      options: [
        ["Pet Friendly", "petFriendly"],
        ["Бізнес-ланчі", "businessLunch"],
        ["Настільні ігри", "boardGames"],
        ["Коворкінг", "coworking"],
      ],
    },
    {
      name: "Привід",
      options: [
        ["День народження", "birthday"],
        ["Ділова зустріч", "businessMeeting"],
        ["Дитяче свято", "childHoliday"],
        ["Романтична вечеря", "romantic"],
        ["Тематичний вечір", "thematicEvent"],
        ["Сімейне свято", "familyHoliday"],
      ],
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "rating";

  const toggleSortBy = (newValue: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      if (newParams.get("sortBy") === newValue) {
        return newParams;
      }

      newParams.set("sortBy", newValue);
      newParams.set("page", "1");

      return newParams;
    });
  };

  const cuisines = searchParams.getAll("cuisines") || [];

  function toggleCuisines(cuisine: string) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      const newCuisines = cuisines.includes(cuisine)
        ? cuisines.filter((ch) => ch !== cuisine)
        : [...cuisines, cuisine];

      params.delete("cuisines");
      newCuisines.forEach((ch) => params.append("cuisines", ch));
      params.set("page", "1");

      return params;
    });
  }

  const searchOptions = searchParams.getAll("searchOptions") || [];

  function toggleSearchOptions(searchOption: string) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      const newSearchOptions = searchOptions.includes(searchOption)
        ? searchOptions.filter((ch) => ch !== searchOption)
        : [...searchOptions, searchOption];

      params.delete("searchOptions");
      newSearchOptions.forEach((ch) => params.append("searchOptions", ch));
      params.set("page", "1");

      return params;
    });
  }

  return (
    <aside className="filters main__filters">
      <FormControl>
        <FormLabel
          id="demo-controlled-radio-buttons-group"
          sx={{
            color: "#000",
            fontWeight: "bold",
            fontSize: "22px",
            "&.Mui-focused": {
              color: "#4C3330",
            },
          }}
        >
          Сортування:
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={sortBy}
          onChange={(event) => toggleSortBy(event.target.value)}
          sx={{
            color: "#4C3330",
            "&.Mui-checked": {
              color: "#4C3330",
            },
            "& .MuiSvgIcon-root": { fontSize: 24 },
          }}
        >
          <FormControlLabel
            value="rating"
            control={<Radio />}
            label="За рейтингом (від високого)"
            sx={{
              color: "#4C3330",
              ".css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked": {
                color: "#4C3330",
              },
            }}
          />
          <FormControlLabel
            value="popularity"
            control={<Radio />}
            label="За популярністю (від високої)"
            sx={{
              color: "#4C3330",
              ".css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked": {
                color: "#4C3330",
              },
            }}
          />
        </RadioGroup>
      </FormControl>

      <FormGroup>
        {filters.map((filter) => (
          <Accordion
            defaultExpanded
            key={filter.name}
            elevation={0}
            sx={{
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h2 className="filters__title">{`${filter.name}:`}</h2>
            </AccordionSummary>
            <AccordionDetails>
              {filter.options.map((option) => (
                <FormControlLabel
                  key={option[1]}
                  control={
                    // eslint-disable-next-line
                    <Checkbox
                      sx={{
                        color: brown[800],
                        "&.Mui-checked": {
                          color: brown[600],
                        },
                        "& .MuiSvgIcon-root": { fontSize: 24 },
                      }}
                      checked={
                        filter.name === "Кухня"
                          ? cuisines.includes(option[1])
                          : searchOptions.includes(option[1])
                      }
                      onChange={() => {
                        if (filter.name === "Кухня") {
                          return toggleCuisines(option[1]);
                        }

                        return toggleSearchOptions(option[1]);
                      }}
                    />
                  }
                  label={option[0]}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </FormGroup>
    </aside>
  );
};

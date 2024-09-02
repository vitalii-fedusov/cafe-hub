export {};
// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getFilteredCafes } from "../../api/cafe";
// import { Cafe } from "../../Types/Cafe";
// /* eslint-disable no-param-reassign */

// type Search = {
//   coworking: boolean;
//   vegan: boolean;
//   petFriendly: boolean;
//   fastService: boolean;
//   wifi: boolean;
//   businessLunch: boolean;
//   freeWater: boolean;
//   boardGames: boolean;
//   birthday: boolean;
//   businessMeeting: boolean;
//   childHoliday: boolean;
//   romantic: boolean;
//   thematicEvent: boolean;
//   familyHoliday: boolean;
//   parking: boolean;
//   terrace: boolean;
//   openNow: boolean;
// };

// type FiltersState = {
//   filteredCafes: Cafe[];
//   search: Search | null;
//   isFiltersLoading: boolean;
//   filtersError: string;
// };

// const initialState: FiltersState = {
//   filteredCafes: [],
//   search: {
//     coworking: false,
//     vegan: false,
//     petFriendly: false,
//     fastService: false,
//     wifi: false,
//     businessLunch: false,
//     freeWater: false,
//     boardGames: false,
//     birthday: false,
//     businessMeeting: false,
//     childHoliday: false,
//     romantic: false,
//     thematicEvent: false,
//     familyHoliday: false,
//     parking: false,
//     terrace: false,
//     openNow: false,
//   },
//   isFiltersLoading: false,
//   filtersError: "",
// };

// export const applyFilters = createAsyncThunk(
//   "filteredCafes/get",
//   (url: string) => {
//     return getFilteredCafes(url);
//   }
// );

// const filtersSlice = createSlice({
//   name: "cafes",
//   initialState,
//   reducers: {
//     // setFilters: (state, action: PayloadAction<Search>) => {
//     //   state.search = {...state.search, action.};
//     // },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(applyFilters.pending, (state) => {
//       state.isFiltersLoading = true;
//     });

//     builder.addCase(applyFilters.fulfilled, (state, action) => {
//       state.filteredCafes = action.payload;
//       state.isFiltersLoading = false;
//     });

//     builder.addCase(applyFilters.rejected, (state) => {
//       state.isFiltersLoading = false;
//       state.filtersError = "Filtered Error";
//     });
//   },
// });

// export default filtersSlice.reducer;

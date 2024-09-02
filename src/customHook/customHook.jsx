import { useState } from 'react';

export const useFetch = (url) => {
  const [value, setValue] = useState([]);

  const data = fetch(url);

  // try {
  //   return JSON.parse(data);
  // } catch (e) {
  //   return value;
  // }

  data
    .then((response) => response.p);

  const save = (newValue) => {
    return setValue(newValue);
  };

  return [value, save];
};

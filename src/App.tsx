import { useQuery } from "@tanstack/react-query";

import { Country } from "./types";

function App() {
  const {
    isPending: isFetchingCountries,
    isError: isCountriesError,
    data: countries,
    error: countriesError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const params = {
        languageIsoCode: "en",
      };
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(
        `https://openholidaysapi.org/Countries?${queryString}`
      );
      return response.json();
    },
  });

  if (isFetchingCountries)
    return <div className="alert alert-warning">Loading...</div>;
  if (isCountriesError)
    return <div className="alert alert-danger">Error fetching countries.</div>;

  return (
    <div className="form-group">
      <label>Select</label>
      <select id="paperSelects1">
        {countries.map((country: Country) => (
          <option value={country.isoCode}>{country.name[0].text}</option>
        ))}
      </select>
    </div>
  );
}

export default App;

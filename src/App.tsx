import { useQuery } from "@tanstack/react-query";

import type { Country } from "./types";
import { useState } from "react";
import CountryHolidays from "./CountryHolidays";

const languageIsoCode = "EN";

function App() {
  const [country, setCountry] = useState("");

  const {
    isPending: isFetchingCountries,
    isError: isCountriesError,
    data: countries,
    error: countriesError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const params = {
        languageIsoCode: languageIsoCode,
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
      <select
        id="paperSelects1"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">Select a Country</option>
        {countries.map((country: Country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name[0].text}
          </option>
        ))}
      </select>
      <CountryHolidays country={country} languageIsoCode={languageIsoCode} />
    </div>
  );
}

export default App;

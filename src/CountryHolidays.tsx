import { useQuery } from "@tanstack/react-query";
import type { Holiday } from "./types";

const CountryHolidays = ({
  country,
  languageIsoCode,
}: {
  country: string;
  languageIsoCode: string;
}) => {
  const {
    isPending: isFetchingHolidays,
    isError: isHolidaysError,
    data: holidays,
  } = useQuery({
    queryKey: ["holidays", country],
    queryFn: async () => {
      const params = {
        countryIsoCode: country,
        validFrom: "2025-01-01",
        validTo: "2025-12-31",
      };
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(
        `https://openholidaysapi.org/PublicHolidays?${queryString}`
      );
      return response.json();
    },
    enabled: !!country,
  });
  if (!country) return null;
  if (isFetchingHolidays)
    return <div className="alert alert-warning">Loading...</div>;
  if (isHolidaysError)
    return <div className="alert alert-danger">Error fetching holidays.</div>;

  return (
    <ul>
      {holidays.map((holiday: Holiday) => (
        <li key={holiday.id}>
          {holiday.startDate}{" "}
          {holiday.name.find((name) => name.language === languageIsoCode)?.text}
        </li>
      ))}
    </ul>
  );
};

export default CountryHolidays;

import { CountriesCard } from "@/types/countriesCard.type";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useState } from "react";
import Header from "@/components/Header";
import CountryCard from "@/components/Card";
import NewCountry from "@/components/AddCountry";

export const GET_ALL_COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;


export default function Home() {
  const [countries, setCountries] = useState<CountriesCard[]>([]);
  const { loading, error, data } = useLazyQuery(GET_ALL_COUNTRIES, {
    onCompleted(data) {
      setCountries(data.countries);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <>
      <Header />
      <NewCountry />
      <section className="countries-list">
        {!loading &&
          countries.map((country) => (
            <CountryCard
              name={country.name}
              emoji={country.emoji}
              code={country.code}
              key={country.code}
            />
          ))}
      </section>
    </>
  )
    ;
}

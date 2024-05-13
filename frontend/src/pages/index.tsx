import { CountriesCard } from "@/types/countriesCard.type";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CountryCard from "@/components/Card";
import NewCountry from "@/components/AddCountry";

const GET_ALL_COUNTRIES = gql`
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

  const [getCountries, { loading: loadingQuestions, error: errorQuestions }] =
    useLazyQuery(GET_ALL_COUNTRIES);

  useEffect(() => {
    fetchCountries();
  }, [])

  if (loadingQuestions) return <p>Loading...</p>;
  if (errorQuestions) return <p>Error...</p>;

  const fetchCountries = () => {
    getCountries({
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        setCountries(data.countries);
      },
    });
  };

  return (
    <>
      <Header />
      <NewCountry fetchCountries={fetchCountries} />
      <section className="countries-list">
        {!loadingQuestions &&
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

import { useRouter } from "next/router";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Country } from "@/types/country.type";
import Header from "@/components/Header";
import styles from "../../styles/countryPage.module.css";


const GET_ONE_COUNTRY = gql`
query getCountryById($code: String!) {
  country(code: $code) {
    id
    name
    emoji
    continent {
      name
    }
  }
}
`;

export default function CountryComponent() {
  const router = useRouter();
  const { code } = router.query;
  const [country, setCountry] = useState<Country | null>(null);
  const getCountry = useQuery(GET_ONE_COUNTRY, {
    variables: {
      code: code,
    },
    onCompleted(data) {
      console.log(data)
      setCountry(data.country);
    },
  });

  const loadingCountry = getCountry.loading;
  const errorCountry = getCountry.error;

  if (loadingCountry) return <p> is Loading ...</p>;
  if (errorCountry) return <p>Error</p>;

  return (
    <>
      <Header />
      {country && (
        <div className={styles.countryContainer}>
          <p className={styles.countryEmoji}>{country.emoji}</p>
          <div className={styles.countryNameAndCode}>
            <span>Name : </span><span className={styles.countryName}> {country.name} </span> (<span>{code}</span>)
          </div>
          {country.continent && (
            <div className={styles.continentNameAndCode}>
              <span>Continent : </span><span className={styles.continentName}> {country.continent.name} </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

import { FormEvent, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styles from "../styles/newCountry.module.css";
import { Continent } from "@/types/continent.type";
import { GET_ALL_COUNTRIES } from "@/pages";


const CREATE_NEW_COUNTRY = gql`
mutation AddCountry($data: NewCountryInput!) {
  addCountry(data: $data) {
    code
    emoji
    name
    continent {
      name
    }
  }
}
`;

const GET_CONTINENTS = gql`
query Continents {
  continents {
    id
    name
  }
}
`;

export default function NewCountry() {
  const router = useRouter();
  const [createCountry] = useMutation(CREATE_NEW_COUNTRY);
  const [continents, setContinents] = useState<Continent[]>([])

  const { loading, error, data } = useQuery(GET_CONTINENTS, {
    onCompleted(data) {
      setContinents(data.continents);
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    createCountry({
      variables: {
        country: {
          name: formJson.name,
          code: formJson.code,
          emoji: formJson.emoji,
          continent: {
            code: formJson.continent
          }
        },
      },
      onCompleted: () => {
        GET_ALL_COUNTRIES
      },
    });
  };

  return (
    <>
      <form className={styles.countryform} onSubmit={(event) => handleSubmit(event)}>
        <div className={styles.labelInput}>
          <label htmlFor="name" className={styles.formLabel}>Name</label>
          <input name="name" className={styles.textInput} type="text"></input>
        </div>
        <div className={styles.labelInput}>
          <label htmlFor="code" className={styles.formLabel}>Code</label>
          <input name="code" className={styles.textInput} type="text"></input>
        </div>
        <div className={styles.labelInput}>
          <label htmlFor="emoji" className={styles.formLabel}>Flag</label>
          <input name="emoji" className={styles.textInput} type="text"></input>
        </div>
        {continents && <div className={styles.labelInput}>
          <label htmlFor="continent" className={styles.formLabel}>Continent</label>
          <select name="continent" id="continent-select" className={styles.selectContinent}>
            {!loading &&
              continents.map((continent) => (
                <option key={continent.code} value={continent.code}>{continent.name}</option>
              ))}
          </select>
        </div>}
        <button className={styles.formButton} type="submit">
          Add
        </button>
      </form>
    </>
  );
}
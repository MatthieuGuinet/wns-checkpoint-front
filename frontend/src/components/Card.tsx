import { CountriesCard } from "@/types/countriesCard.type";
import styles from "../styles/countryCard.module.css";

export default function CountryCard({ name, emoji, code }: CountriesCard) {
  const linkToCountry = `country/${code}`
  return (
    <a className={styles.countryCard} href={linkToCountry}>
      <div className={styles.countryName}>{name}</div>
      <div className={styles.countryEmoji}>{emoji}</div>
    </a>
  );
}

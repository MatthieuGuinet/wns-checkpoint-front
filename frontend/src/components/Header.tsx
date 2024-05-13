import Link from "next/link";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Checkpoint : frontend</h1>
      <Link className={styles.link} href="/">Countries</Link>
    </header>
  );
}

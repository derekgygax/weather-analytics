

// components
import { SearchBar } from "../searchBar/SearchBar"

// styles
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <SearchBar />
    </header>
  )
}


// utils
import { capitalizeAsTitle } from '../../lib/utils';

// layouts
import { Title } from '../../layouts/title/Title';

// styles
import styles from './Forecast.module.scss';

export const Forecast = () => {
  return (
    <>
      <Title
        level={1}
        // This MAY get a variable so we leave capitalizeAsTitle
        title={capitalizeAsTitle("Forecast")}
        className={styles.forecastTitle}
      />
      <section className={styles.chartsContainer}>

      </section>
    </>
  )
}

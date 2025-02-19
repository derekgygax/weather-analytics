
// styles
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  loadingText: string
}

export const LoadingSpinner = ({ loadingText }: LoadingSpinnerProps) => {
  return (
    <div className={styles.loadingSpinner}>
      <p className={styles.loadingSpinner__text}>{`${loadingText}...`}</p>
      <div className={styles.loadingSpinner__circle}></div>
    </div>
  );
};

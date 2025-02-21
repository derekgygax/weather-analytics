import classNames from 'classnames';

// styles
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  loadingText: string;
  isDark?: boolean;
}

export const LoadingSpinner = ({ loadingText, isDark }: LoadingSpinnerProps) => {
  return (
    <div className={styles.loadingSpinner}>
      <p className={styles.loadingSpinner__text}>{`${loadingText}...`}</p>
      <div className={classNames(
        styles.loadingSpinner__circle,
        isDark ? styles.dark : styles.light
      )}></div>
    </div>
  );
};

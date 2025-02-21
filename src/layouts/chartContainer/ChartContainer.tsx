
// styles
import styles from './ChartContainer.module.scss';

interface ChartContainerProps {
  children: React.ReactNode;
}

export const ChartContainer = ({ children }: ChartContainerProps) => {
  return (
    <div className={styles.chartContainer}>
      {children}
    </div>
  )
}

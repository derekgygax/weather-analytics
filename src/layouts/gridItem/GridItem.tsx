import React from "react";

// styles
import styles from './GridItem.module.scss';

interface GridItemProps {
  title: string;
  children: React.ReactNode;
}

export const GridItem = ({ title, children }: GridItemProps) => {
  return (
    <div className={styles.gridItem}>
      <h3 className={styles.gridItem__title}>{title}</h3>
      {children}
    </div>
  );
};
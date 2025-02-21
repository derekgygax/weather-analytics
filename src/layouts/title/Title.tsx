import classNames from "classnames";

import { JSX } from "react";

// styles
import styles from './Title.module.scss';

interface TitleProps {
  title: string;
  level: number;
  className?: string;
}

export const Title = ({ title, level, className }: TitleProps) => {

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={classNames(styles.title, className)}>{title}</Tag>
  );

}
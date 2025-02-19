import classNames from "classnames";

// styles
import globalStyles from '@/styles/globals.module.scss';
import styles from './PageSection.module.scss';

interface PageSectionProps {
  background?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  innerStyle?: string;
  ariaLabel?: string;
}

export const PageSection = ({
  background,
  children,
  className,
  id,
  innerStyle,
  ariaLabel
}: PageSectionProps) => {
  return (
    <section
      id={id}
      className={classNames(className, background, styles.pageSection)}
      aria-label={ariaLabel}
    >
      <div className={classNames(innerStyle, globalStyles.containerFullPage)}>
        {children}
      </div>
    </section>
  )
}